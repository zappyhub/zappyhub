import jwt from "jsonwebtoken"
import { ITokenProvider } from "@/interfaces/IAuth";



const SECRET = process.env.JWT_SECRET!;


export class JwtTokenProvider implements ITokenProvider {
  sign(payload: object): string {
    return jwt.sign(payload,SECRET,{expiresIn:"1h"})
  }
}
