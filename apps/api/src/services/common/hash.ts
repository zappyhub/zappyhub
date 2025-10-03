import crypto, { scrypt as _scrypt, randomBytes, ScryptOptions } from "crypto";


/**
 * Valor secreto fixo da aplicação usado para aumentar a entropia da senha.
 * Deve ser definido no arquivo `.env` como `PEPPER_SECRET`.
 *
 * @constant
 * @throws Error se `PEPPER_SECRET` não estiver definido
 */

if (!process.env.PEPPER_SECRET) {
  throw new Error("PEPPER_SECRET não definida no .env")
}
const PEPPER = process.env.PEPPER_SECRET ?? "";

/**
 * Parâmetros padrão de custo para o algoritmo scrypt.
 * Ajustam o consumo de memória e CPU:
 * - `N`: custo computacional
 * - `r`: tamanho do bloco
 * - `p`: paralelização
 * - se tempo de hash no servidor estiver lento ajustar N para 2 ** 14 ou 2 ** 15
 * @constant
 */
const DEFAULT_PARAMS: ScryptOptions = { N: 2 ** 16, r: 8, p: 1 }



/**
 * Executa o algoritmo scrypt de forma assíncrona.
 *
 * @param data - String de entrada (senha + pepper)
 * @param salt - Salt em formato hexadecimal
 * @param keylen - Tamanho da chave derivada em bytes
 * @param options - Parâmetros de custo do scrypt (N, r, p)
 * @returns Promise que resolve com o buffer da chave derivada
 */

function scryptAsync(
  data: string,
  salt: string,
  keylen: number,
  options: ScryptOptions
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    _scrypt(data, salt, keylen, options, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey);
    })
  })
}

/**
 * Gera um hash seguro da senha usando scrypt com pepper e salt.
 *
 * @param password - Senha original fornecida pelo usuário
 * @returns String formatada contendo o algoritmo, versão, parâmetros, salt e hash
 *
 * @example
 * const hash = await hashPassword("minhaSenha123");
 * // scrypt$v1$65536$8$1$<salt>:<hash>
 */
export async function hashPassword(password: string): Promise<string> {

  const salt = randomBytes(16).toString("hex");
  const keyLen = 64;
  const derivedBuf = (await scryptAsync(password + PEPPER, salt, keyLen, DEFAULT_PARAMS))

  return `scrypt$v1$${DEFAULT_PARAMS.N}$${DEFAULT_PARAMS.r}$${DEFAULT_PARAMS.p}$${salt}:${derivedBuf.toString("hex")}`;
}

/**
 * Verifica se a senha em texto plano corresponde ao hash armazenado.
 *
 * @param password – Senha em texto plano fornecida pelo usuário.
 * @param stored – Hash completo gerado por `hashPassword`, no formato
 *                  `scrypt$v1$N$r$p$salt:hash`.
 * @returns Promise<boolean> – `true` se a senha conferiu, `false` caso contrário.
 *
 * @example
 * // Em AuthService ou LoginController:
 * import { verifyPassword } from "@/services/commom/hash";
 *
 * async function authenticate(email: string, plainPwd: string) {
 *   const user = await userRepo.getByEmail(email);
 *   if (!user) throw new Error("Usuário não encontrado");
 *
 *   const valid = await verifyPassword(plainPwd, user.passwordHash);
 *   if (!valid) throw new Error("Credenciais inválidas");
 *
 *   // prosseguir para emitir token JWT ou sessão...
 * }
 *
 * @remarks
 *  função usada  na camada de autenticação para comparar a senha recebida do
 * front com o hash armazenado no banco antes de conceder acesso.
 */

export async function verifyPassword(password: string, stored: string): Promise<boolean> {

  const combo = stored.split("$").pop()!;
  const [salt, hashHex] = combo.split(":");

  const keyLen = Buffer.from(hashHex, "hex").length;
  const derivedBuf = await scryptAsync(
    password + PEPPER,
    salt,
    keyLen,
    DEFAULT_PARAMS,
  )

  const derivedArr = Uint8Array.from(derivedBuf);
  const storedArr = Uint8Array.from(Buffer.from(hashHex, "hex"));

  return crypto.timingSafeEqual(derivedArr, storedArr)
}
