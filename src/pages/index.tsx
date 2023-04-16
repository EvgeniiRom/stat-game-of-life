import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextDialog from "../components/TextDialog";
import { login, loginSelector } from "../store/sessionReduser";

const Login = () => {
    const isLogin = useSelector(loginSelector);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        isLogin && router.push("/game");
    }, [isLogin, router]);

    const onOk = (value: string) => {
        if (value.trim().length > 0) {
            dispatch(login(value));
        }
    };

    return (
        <>
            <TextDialog message="Кто ты, воин?" onOk={onOk} />
        </>
    );
};

export default Login;
