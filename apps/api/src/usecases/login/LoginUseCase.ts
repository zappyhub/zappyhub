import { AuthTokens, IAuthService, IHashService, ITokenProvider, LoginDTO } from "@/interfaces/IAuth";
import { IUserRepo } from "@/interfaces/IUser";



export class LoginUseCase implements IAuthService {
  constructor(private userRepo: IUserRepo, private hashService: IHashService, private tokenProvider: ITokenProvider) { }

  async authenticate(dto: LoginDTO): Promise<AuthTokens> {
    const user = await this.userRepo.getUserByEmail(dto.email);
    if (!user) throw new Error("Credencias inválidas");

    const ok = await this.hashService.verify(dto.password, user.passwordHash);
    if (!ok) throw new Error("Credencias inválidas");

    //payload básico
    const payload = { userId: user.id, role: user.role };
    const accessToken = this.tokenProvider.sign(payload);

  
    return { accessToken };
  }
}
