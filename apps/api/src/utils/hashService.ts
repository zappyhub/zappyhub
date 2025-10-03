import { IHashService } from "@/interfaces/IAuth";
import { hashPassword as _hash, verifyPassword as _verify } from "@/services/common/hash";

// Esse serviço é so um adapter pra fazer hash de senha no usecase de login


export class HashService implements IHashService {
  async hash(password: string): Promise<string> {
    return _hash(password)
  }

  async verify(password: string, stored: string): Promise<boolean> {
    return _verify(password, stored)
  }
}

