import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  FileText,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import type { RootState } from "@/store";
import cookieService from "@/utils/cookieService";
import auth from "@/lib/queries/auth";

const Header: React.FC = () => {
  const token=cookieService.getToken()!
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {favourites}=useSelector((state:RootState)=>state.favourites)
  const {isAuthanticated}=useSelector((state:RootState)=>state.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {data:profile}=auth.useGetProfile(token)
  const handleLogout=()=>{
    dispatch(logout())
    toast.success("Logout successfully.")
    navigate("/login")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-red">
            El Fahd
          </Link>

          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-6">
            <div className="relative w-full max-w-2xl mx-auto">
              <Input
                type="search"
                placeholder={"Search..."}
                className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-red"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-black p-2 cursor-pointer"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {isAuthanticated ? (
              <>
                <Link to="/favourites" className="relative">
                  <Heart className="h-6 w-6 text-brand-black hover:text-brand-red transition-colors" />
                  {favourites.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-red text-white text-xs">
                      {favourites.length}
                    </Badge>
                  )}
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-9 w-9 border border-gray-200 cursor-pointer"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="py-2 px-2 text-sm font-medium capitalize">
                    <span className="text-red">welcome:</span> {profile?.data.name} 👋
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/favourites" className="w-full cursor-pointer">
                      <Heart className="mr-2 h-4 w-4"/>
                        Favourites
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-ads" className="w-full cursor-pointer">
                        <FileText className="mr-2 h-4 w-4" />
                        My Ads
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="w-full cursor-pointer">
                      <Settings className="mr-2 h-4 w-4"/>
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-500 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button asChild className="bg-red hover:bg-red/90 hidden sm:flex">
              <Link to="/post-ad">Post Ad</Link>
            </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="text-black hover:text-red border border-gray-300"
                >
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-red hover:bg-red/90">
                  <Link to="/register">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Link>
                </Button>
              </>
            )}


            
          </nav>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="md:hidden mt-3">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder={"Search..."}
              className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-red"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-3 border-t pt-3 animate-fade-in">
            <ul className="space-y-2">
              {isAuthanticated ? (
                <>
                  <li className="px-2 py-1 text-sm font-medium capitalize">
                    <span className="text-red">welcome:</span> {profile?.data.name} 👋
                  </li>
                  <li>
                    <Link
                      to="/favourites"
                      className="flex items-center px-2 py-1 hover:bg-gray-100 rounded"
                      onClick={toggleMobileMenu}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Favourites
                      {favourites.length > 0 && (
                        <Badge className="ml-2 bg-brand-red text-white">
                          {favourites.length}
                        </Badge>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-ads"
                      className="flex items-center px-2 py-1 hover:bg-gray-100 rounded"
                      onClick={toggleMobileMenu}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      My Ads
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center px-2 py-1 hover:bg-gray-100 rounded"
                      onClick={toggleMobileMenu}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout()
                        toggleMobileMenu();
                      }}
                      className="flex items-center w-full px-2 py-1 text-red-500 hover:bg-gray-100 rounded"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center px-2 py-1 hover:bg-gray-100 rounded"
                      onClick={toggleMobileMenu}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="flex items-center px-2 py-1 hover:bg-gray-100 rounded"
                      onClick={toggleMobileMenu}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </Link>
                  </li>
                </>
              )}
              
              
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;