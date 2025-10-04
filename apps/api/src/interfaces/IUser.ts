
/**
 * Dados necessários para criar um novo usuário.
 * Esse DTO é recebido somente no corpo da requisição (req.body).
 *
 * @example
 * {
 *   "name": "Zezin",
 *   "userName": "Zezin123",
 *   "email": "zezin@example.com",
 *   "cellphoneNumber": "+5547999999999",
 *   "password": "123456",
 *   "role": "USER"
 * }
 */
export interface CreateUserDTO {
  name: string;
  userName: string;
  email: string;
  cellphoneNumber: string;
  password: string;
  role?: "USER" | "ADMIN";
}

/**
 * Dados opcionais para atualizar um usuário existente.
 * Todos os campos são parciais (patch).
 *
 * @example
 * {
 *   "name": "Novo Nome",
 *   "email": "novoemail@example.com"
 * }
 */
export type UpdateUserDTO = {
  name?: string;
  userName?: string;
  email?: string;
  cellphoneNumber?: string;
  password?: string;
  role?: "USER" | "ADMIN";

}

/**
 * Formato de resposta em caso de erro.
 * @returns Objeto JSON com a chave `error` descrevendo o problema.
 */
export type ErrorResponseDTO = { error: string };



/**
 * Dados do usuário autenticado injetado pelo middleware.
 *
 * @remarks
 * - USER pode alterar só a si mesmo (não altera role).
 * - ADMIN pode alterar ou deletar qualquer usuário.
 */
export interface AuthUser {
  id: string;
  role: "USER" | "ADMIN";
}





/**
 * Entidade interna do domínio User.
 * Representa como o usuário é armazenado no banco.
 * Não deve ser exposta diretamente na API.
 *
 * @remarks
 * - Contém `passwordHash` (campo sensível).
 */
export type UserEntity = {
  readonly id: string;
  name: string;
  userName: string;
  email: string;
  cellphoneNumber: string;
  passwordHash: string;
  role: "ADMIN" | "USER";
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  deletedAt: Date | null;
};



/**
 * Representa um erro de aplicação padronizado.
 *
 * @example
 * {
 *   "code": "INVALID_INPUT",
 *   "message": "O campo email é obrigatório"
 * }
 */
export type AppError = {
  code: string
  message: string;
};



/**
 * Resultado de uma operação de use case.
 * Pode ser sucesso (`ok: true`) ou erro (`ok: false`).
 *
 * @typeParam T - Tipo do valor de sucesso
 *
 * @example
 * const result: Result<UserEntity> = { ok: true, value: user };
 */export type Result<T> =
  | { ok: true, value: T }
  | { ok: false, error: AppError };


export interface DeletedUserDTO {
  id: string,
  name: string,
  message: string
}




/**
 * Converte a entidade interna para a resposta pública.
 *
 * @param entity Usuário interno do domínio.
 * @returns Formato pronto para API (DTO público).
 */
export function toUserResponse(entity: UserEntity): UserResponseDTO {
  return {
    id: entity.id,
    name: entity.name,
    userName: entity.userName,
    email: entity.email,
    cellphoneNumber: entity.cellphoneNumber,
    role: entity.role,
    active: entity.active,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
}



/**
 * Formato de resposta pública de um usuário.
 * Esse DTO é retornado para o cliente.
 *
 * @remarks
 * - Datas são strings ISO (não objetos Date).
 * - Não expõe `passwordHash`.
 */
export interface UserResponseDTO {
  id: string;
  name: string;
  userName: string;
  role?: "USER" | "ADMIN";
  active: boolean;
  createdAt: string;
  updatedAt: string;
  email: string;
  cellphoneNumber: string;
}


export interface AuthRequest extends Request {
  user?: AuthUser
}





/**
 * Contrato do repositório de usuários.
 * Define as operações de persistência no banco de dados.
 *
 * @see UserEntity
 * @see CreateUserDTO
 * @see UpdateUserDTO
 */
export interface IUserRepo {
  /**
   * Cria um novo usuário no repositório.
   *
   * @param data - Dados necessários para criação de um usuário.
   * @returns Promise que resolve com a entidade do usuário criado.
   */
  createUser(data: CreateUserDTO): Promise<UserEntity>;
  /**
   * Retorna todos os usuários cadastrados.
   *
   * @returns Promise que resolve com um array de entidades de usuário.
   */
  getAllUsers(): Promise<UserEntity[]>;

  /**
   * Busca um usuário pelo seu identificador único.
   *
   * @param id - Identificador único do usuário.
   * @returns Promise que resolve com a entidade do usuário ou `undefined` se não encontrado.
   */
  getUserById(id: string): Promise<UserEntity | undefined>;
  /**
   * Busca um usuário pelo nome de usuário (username).
   *
   * @param userName - Nome de usuário único.
   * @returns Promise que resolve com a entidade do usuário ou `undefined` se não encontrado.
   */
  getUserByName(userName: string): Promise<UserEntity | undefined>
  /**
   * Busca um usuário pelo seu endereço de e-mail.
   *
   * @param email - Endereço de e-mail do usuário.
   * @returns Promise que resolve com a entidade do usuário ou `undefined` se não encontrado.
   */
  getUserByEmail(email: string): Promise<UserEntity | undefined>;
  /**
   * Busca um usuário pelo seu número de celular.
   *
   * @param cellphoneNumber - Número de celular no formato internacional.
   * @returns Promise que resolve com a entidade do usuário ou `undefined` se não encontrado.
   */
  getUserByPhone(cellphoneNumber: string): Promise<UserEntity | undefined>;

  /**
   * Atualiza dados de um usuário existente.
   *
   * @param id - Identificador único do usuário a ser atualizado.
   * @param data - Dados parciais para atualização do usuário.
   * @returns Promise que resolve com a entidade do usuário atualizada.
   */
  updateUser(id: string, data: UpdateUserDTO): Promise<UserEntity>;
  /**
   * Remove um usuário do repositório.
   *
   * @param id - Identificador único do usuário a ser removido.
   * @returns Promise que resolve quando a remoção for concluída.
   */
  deleteUser(id: string): Promise<void>;
}

