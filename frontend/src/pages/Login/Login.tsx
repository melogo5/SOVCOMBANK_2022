import React, { FC, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { Button, Checkbox } from 'antd';
import { useForm } from 'effector-react-form';

import { loginForm, loginFormSubmit, $user } from '../../context/user';

import "./Login.css";
import { InputField } from '../../form/input';
import { PasswordInputField } from '../../form/passwordInput';
import { CenterContent } from '../../components';

const Login: FC = () => {
  const navigate = useNavigate();
  const { controller } = useForm({ form: loginForm });

  const user = useUnit($user);
  useEffect(() => {
    console.log({ user });
    if (!user) return;

    if (!user.user) navigate("/review");
  }, [user]);

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

        <Button onClick={() => navigate("/register")} type="default">Зарегистрироваться</Button>
      </div>

      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </CenterContent>
    /* </div> */
  );
};

export default Login;
