import crypto from "crypto";


const ALGO = "aes-256-gcm";
const IV_LENGTH = 12;





/**
 * Converte uma string hexadecimal em Uint8Array
 * @param hex – texto em hexadecimal
 * @returns Uint8Array com os bytes correspondentes
 */
function hexToUint8(hex: string): Uint8Array {
  const buf = Buffer.from(hex, "hex");
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)
}

/**
 * Concatena múltiplos Uint8Array em um único Uint8Array.
 *
 * @param arrs – lista de pedaços a serem unidos
 * @returns novo Uint8Array contendo todos os pedaços
 */
function concatUint8(arrs: Uint8Array[]): Uint8Array {
  const totalLen = arrs.reduce((sum, a) => sum + a.length, 0);
  const res = new Uint8Array(totalLen);
  let offset = 0;
  for (const a of arrs) {
    res.set(a, offset);
    offset += a.length;
  }
  return res;
}


/**
 * Converte um Uint8Array em string hexadecimal.
 *
 * @param a – array de bytes  
 * @returns representação em hex (string)
 */
function Uint8ToHex(a: Uint8Array): string {
  return Buffer.from(a).toString("hex");
}


const key = process.env.CRYPTO_KEY_USER!;
if (!key || key.length !== 64) {
  throw new Error("key inválida ou ausente")
}

const KEY = hexToUint8(key);

/**
* Gera um IV aleatório, executa cipher.update + cipher.final,
* concatena os pedaços e retorna no formato:
*   iv: ciphertext: tag
*
* @param plain – texto limpo a ser cifrado
* @returns string “ivHex:ctHex:tagHex”
*/
export function encrypt(plain: string): string {
  const ivBuf = crypto.randomBytes(IV_LENGTH);
  const iv = new Uint8Array(ivBuf.buffer, ivBuf.byteOffset, ivBuf.byteLength);

  const cipher = crypto.createCipheriv(ALGO, KEY, iv);

  //Cada pedaço vira Uint8Array

  const chunk1 = new Uint8Array(cipher.update(plain, "utf8").buffer);
  const chunk2 = new Uint8Array(cipher.final().buffer);

  const encrypted = concatUint8([chunk1, chunk2]);

  const tag = new Uint8Array(cipher.getAuthTag().buffer);

  return `${Uint8ToHex(iv)}:${Uint8ToHex(encrypted)}:${Uint8ToHex(tag)}`;
}

/**
 * Descriptografa um payload gerado por encrypt().
 *
 * Espera entrada no formato ivHex:ctHex:tagHex, converte
 * cada parte de volta, executa decipher.update + final
 * e retorna o texto original em UTF-8.
 *
 * @param payload – string no formato iv:ct:tag
 * @returns texto limpo recuperado
 */
export function decrypt(payload: string): string {
  const [ivHex, ctHex, tagHex] = payload.split(":");

  const iv = hexToUint8(ivHex);
  const ctBuf = Buffer.from(ctHex, "hex");
  const ct = new Uint8Array(ctBuf.buffer, ctBuf.byteOffset, ctBuf.byteLength);
  const tag = hexToUint8(tagHex);

  const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(tag);

  const dec1 = new Uint8Array(decipher.update(ct).buffer);
  const dec2 = new Uint8Array(decipher.final().buffer);

  const decrypted = concatUint8([dec1, dec2]);
  return Buffer.from(decrypted).toString("utf8");
}

