"use client";

import { useState } from "react";
import AuthShell from "@/components/modules/main/authShell";
import LoginForm from "@/components/template/main/login-register/loginForm";
import RegisterForm from "@/components/template/main/login-register/registerForm";
import type { AuthMode } from "@/types";

const AuthForms = () => {
  const [mode, setMode] = useState<Exclude<AuthMode, "sms">>("login");

  return (
    <AuthShell
      image="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=700&h=800&q=80"
      alt="A child wearing a polka-dot top in front of a flower wall"
    >
      {mode === "login" ? (
        <LoginForm showRegisterForm={() => setMode("register")} />
      ) : (
        <RegisterForm showLoginForm={() => setMode("login")} />
      )}
    </AuthShell>
  );
};

export default AuthForms;
