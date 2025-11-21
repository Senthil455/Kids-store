"use client"
import { authTypes } from "@/utils/constants";
import { useState } from "react";
import Login from "@/components/template/login-register/Login";
import Register from "@/components/template/login-register/Register";
import Image from "next/image";
import Footer from "@/components/modules/footer/footer";
const Login_register = () => {
    const [authType, setAuthType] = useState(authTypes.LOGIN);

    const showRegisterForm = () => setAuthType(authTypes.REGISTER);
    const showloginForm = () => setAuthType(authTypes.LOGIN);

    return (
        <>
            <div className="login_register">
                <div className="form_bg" data-aos="fade-up">
                    {authType === authTypes.LOGIN ? (
                        <Login showRegisterForm={showRegisterForm}
                        />
                    ) : (
                        <Register showloginForm={showloginForm}
                        />
                    )}
                </div>
                <section>
                    <Image
                        width={400}
                        height={400}
                        src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
                        alt=""
                    />
                </section>
            </div>
            <Footer />

        </>
    );
};

export default Login_register;
