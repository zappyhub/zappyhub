import crypto from "crypto";


const keyBuf = Buffer.from(process.env.CRYPTO_KEY!, "hex");

const keyArr = Uint8Array.from(keyBuf);

const zeroIvArr = new Uint8Array(16);

const ALGO = "aes-256-cbc";

export function encrypt(plain: string): string {
  const cipher = crypto.createCipheriv(ALGO, keyArr, zeroIvArr);

  const b1 = cipher.update(plain, "utf8");
  const b2 = cipher.final();
  const arr1 = Uint8Array.from(b1);
  const arr2 = Uint8Array.from(b2);

  return Buffer.concat([arr1, arr2]).toString("hex");

}


export function decrypt(ctHex: string): string {
  const ctBuf = Buffer.from(ctHex, "hex");
  const ctArr = Uint8Array.from(ctBuf);
  const decipher = crypto.createDecipheriv(ALGO, keyArr, zeroIvArr);

  const b1 = decipher.update(ctArr);
  const b2 = decipher.final();
  const arr1 = Uint8Array.from(b1);
  const arr2 = Uint8Array.from(b2);

  return Buffer.concat([arr1, arr2]).toString("utf8");
}
