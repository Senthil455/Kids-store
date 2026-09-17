"use client"
import { authTypes } from "@/utils/constants";
import { useState } from "react";
import Login from "@/components/template/main/login-register/Login";
import Register from "@/components/template/main/login-register/Register";
import AuthShell from "@/components/modules/main/authShell";

const Login_register = () => {
    const [authType, setAuthType] = useState(authTypes.LOGIN);

    const showRegisterForm = () => setAuthType(authTypes.REGISTER);
    const showloginForm = () => setAuthType(authTypes.LOGIN);

    return (
        <AuthShell image="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80">
            {authType === authTypes.LOGIN ? (
                <Login showRegisterForm={showRegisterForm} />
            ) : (
                <Register showloginForm={showloginForm} />
            )}
        </AuthShell>
    );
};

export default Login_register;
