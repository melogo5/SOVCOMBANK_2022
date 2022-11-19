import React, { FC } from 'react';
import { useUnit } from "effector-react";
import { Button, Checkbox, Input } from 'antd';
import { useForm } from 'effector-react-form';

import { loginForm, loginFormSubmit, $user } from './model';

import "./Login.css";
import { InputField } from '../../form/input';
import { useEffect } from 'react';
import { PasswordInputField } from '../../form/passwordInput';
import { CenterContent } from '../../components';

const Login: FC = () => {
    const { controller, handleSubmit } = useForm({ form: loginForm });

    const user = useUnit($user);

    useEffect(() => console.log({ user }), [user]);

    return (
        // <div className="page-login">
        <CenterContent taCenter>
            <div className="formLoginWrapper">
                <InputField
                    inputClassName="login-name-field"
                    lableClassName="login-label"
                    controller={controller({ name: "login" })}
                    label={"Вход"}
                    placeholder="Иван"
                />

                <PasswordInputField controller={controller({ name: "password" })} className="login-password-field" />

                <div className="login-remember-block">
                    <Checkbox>Запомнить меня</Checkbox>

                    <Button onClick={loginFormSubmit} type="primary" htmlType="submit">
                        Войти
                    </Button>
                </div>


                <Button onClick={() => { }} type="default" htmlType="submit">
                    Зарегестрироваться
                </Button>

            </div>

            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </CenterContent>
        /* </div> */ 
    );
};

export default Login;