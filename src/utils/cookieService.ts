import type { TRole } from "@/types";
import Cookies from "universal-cookie";
class CookieService {
  private cookies: Cookies;
  constructor() {
    this.cookies = new Cookies();
  }
  setToken(token: string, expiresInDays: number = 7) {
    if (!token) throw new Error("Invalid Token.");
    const expires = new Date();
    expires.setDate(expires.getDate() + expiresInDays);
    this.cookies.set("t_n", token, {
      expires,
      path: "/",
      secure: import.meta.env.VITE_ENV === "production",
    });
  }
  getToken(): string | undefined {
    const token = this.cookies.get("t_n");
    return token && token.trim() !== "" ? token : undefined;
  }
  //* user role
  setRole(role: TRole, expiresInDays: number = 7) {
    if (!role) throw new Error("Invalid role.");
    const expires = new Date();
    expires.setDate(expires.getDate() + expiresInDays);
    this.cookies.set("r_l", role, {
      expires,
      path: "/",
      secure: import.meta.env.VITE_ENV === "production",
    });
  }
  getRole(): TRole | undefined {
    const role = this.cookies.get("r_l");
    return role && role.trim() !== "" ? role : undefined;
  }
  removeAllCookies() {
    this.cookies.remove("t_n", { path: "/" });
    this.cookies.remove("r_l", { path: "/" });
  }
}
export default new CookieService();
