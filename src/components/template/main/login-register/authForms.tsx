"use client";

import { useState } from "react";
import AuthShell from "@/components/modules/main/authShell";
import LoginForm from "@/components/template/main/login-register/loginForm";
import RegisterForm from "@/components/template/main/login-register/registerForm";
import type { AuthMode } from "@/types";

const AuthForms = () => {
  const [mode, setMode] = useState<Exclude<AuthMode, "sms">>("login");

  return (
    <AuthShell image="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80">
      {mode === "login" ? (
        <LoginForm showRegisterForm={() => setMode("register")} />
      ) : (
        <RegisterForm showLoginForm={() => setMode("login")} />
      )}
    </AuthShell>
  );
};

export default AuthForms;
