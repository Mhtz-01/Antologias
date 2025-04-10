"use client";

import { createContext, useContext, useEffect, useState } from "react";
import User from "@/domain/entities/user"; 
import NGO from "@/domain/entities/ngo";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);

      const ngo = new NGO(
        parsed.ngo.id,
        parsed.ngo.name,
        parsed.ngo.description,
        parsed.ngo.is_formalized,
        parsed.ngo.start_year,
        parsed.ngo.contact_phone,
        parsed.ngo.instagram_link,
        parsed.ngo.x_link,
        parsed.ngo.facebook_link,
        parsed.ngo.pix_qr_code_link,
        parsed.ngo.gallery_images_url,
        parsed.ngo.skills,
        parsed.ngo.causes,
        parsed.ngo.sdgs
      );

      const restoredUser = new User(parsed.name, parsed.email, ngo);
      setUser(restoredUser);
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
