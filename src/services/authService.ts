import axiosApi from "@/config/axios.config";
import type {
  ILogin,
  ILoginRes,
  IProfileRes,
  IRegister,
  IRegisterRes,
} from "@/interface/auth";

class AuthService {
  async register(userData: IRegister): Promise<IRegisterRes> {
    return (await axiosApi.post<IRegisterRes>("/users/register", userData))
      .data;
  }
  async login(loginData: ILogin):Promise<ILoginRes> {
    return (await axiosApi.post<ILoginRes>("/users/login", loginData)).data;
  }
  async getProfile(token: string):Promise<IProfileRes> {
    return (await axiosApi.get<IProfileRes>("users/profile", {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })).data;
  }
}
export default new AuthService();
