import type { RootState } from "@/store";
import cookieService from "@/utils/cookieService";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

function ProtectedRoutes(props: IProps) {
  const { children } = props;
  const token = cookieService.getToken();
  const { isAuthanticated } = useSelector((state: RootState) => state.auth);
  if (!token || !isAuthanticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoutes;
