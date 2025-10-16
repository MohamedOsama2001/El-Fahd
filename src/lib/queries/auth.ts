import QueryKeys from "@/enums";
import type { ILogin, IRegister } from "@/interface/auth";
import authService from "@/services/authService";
import { useMutation, useQuery } from "@tanstack/react-query";
class AuthQueries{
  useRegister() {
    return useMutation({
      mutationFn: (userData: IRegister) => authService.register(userData),
    });
  };
  //* login 
  useLogin() {
    return useMutation({
      mutationFn: (loginData: ILogin) => authService.login(loginData),
    });
  };
  //* profile
  useGetProfile(token:string){
    return useQuery({
        queryKey:[QueryKeys.PROFILE],
        queryFn:()=>authService.getProfile(token),
        enabled:!!token
    })
}

}
export default new AuthQueries() 
