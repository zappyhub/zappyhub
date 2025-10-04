import { Result } from "@/interfaces/IUser";
import { Response } from "express";
import { mapErrorToStatus } from "./mapErrorToStatus";

/**
 * Manipula o resultado de um caso de uso (`Result<T>`) e envia a resposta HTTP apropriada.
 *
 *
 * @typeParam T - Tipo do valor interno retornado pelo caso de uso (ex.: `UserEntity[]`).
 * @typeParam R - Tipo do DTO público que será enviado na resposta (ex.: `UserResponseDTO[]`).
 *
 *
 * @param res - Objeto de resposta do Express, tipado para aceitar `R` ou um objeto de erro `{ error: string }`.
 * @param result - Resultado da operação (`Result<T>`), podendo ser sucesso (`ok: true`) ou erro (`ok: false`).
 * @param successStatus - Código de status HTTP a ser usado em caso de sucesso (default: 200).
 * @param mapper - Função que transforma o valor interno (`T`) em um DTO público (`R`).
 *
 *
 *
 * @remarks
 * - Se `result.ok` for `true`, aplica o `mapper` e envia a resposta com `successStatus`.
 * - Se `result.ok` for `false`, converte o `AppError` em `{ error: string }` e envia com o status apropriado.
 * - Esse padrão garante que entidades internas (`UserEntity`) nunca sejam expostas diretamente,
 *   apenas DTOs públicos (`UserResponseDTO`).
 *
 *

 * @example
 * // Exemplo em um controller de usuários
 * const result: Result<UserEntity[]> = await usecase.handle(currentUser);
 * handleResult(res, result, 200, (users) => users.map(toUserResponse));
 *
 *
 *
 * @see Result
 * @see AppError
 */
export function handleResult<T, R>(
  res: Response<R | { error: string }>,
  result: Result<T>,
  successStatus = 200,
  mapper: (value: T) => R
): void {
  if (result.ok) {
    const dto: R = mapper(result.value);
    res.status(successStatus).json(dto);
  } else {
    res.status(mapErrorToStatus(result.error.code)).json({ error: result.error.message })
  }
}
