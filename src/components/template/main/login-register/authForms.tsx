"use client";

import { useState } from "react";
import Login from "@/components/template/main/login-register/Login";
import Register from "@/components/template/main/login-register/Register";
import AuthShell from "@/components/modules/main/authShell";
import type { AuthMode } from "@/types";

const AuthForms = () => {
  const [mode, setMode] = useState<Exclude<AuthMode, "sms">>("login");

  return (
    <AuthShell image="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80">
      {mode === "login" ? (
        <Login showRegisterForm={() => setMode("register")} />
      ) : (
        <Register showLoginForm={() => setMode("login")} />
      )}
    </AuthShell>
  );
};

export default AuthForms;
