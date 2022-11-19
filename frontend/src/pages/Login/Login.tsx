import React, { FC } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox } from 'antd';
import { useForm } from 'effector-react-form';
import { loginForm, loginFormSubmit } from '../../context/user';
import useLoginNavigate from "../../hook/useLoginNavigate";
import "./Login.css";
import { InputField } from '../../form/input';
import { PasswordInputField } from '../../form/passwordInput';
import { CenterContent } from '../../components';

const Login: FC = () => {
  const navigate = useNavigate();
  const { controller } = useForm({ form: loginForm });
  useLoginNavigate();

  return (
    <CenterContent taCenter>
      <div className="formLoginWrapper">
        <InputField
          inputClassName="login-name-field"
          lableClassName="login-label"
          controller={controller({ name: "login" })}
          label={"Вход"}
          placeholder="Электронная почта"
        />

        <PasswordInputField controller={controller({ name: "password" })} className="login-password-field" />

        <div className="login-remember-block">
          <Checkbox>Запомнить меня</Checkbox>

          <Button size='large' onClick={loginFormSubmit} type="primary" htmlType="submit">
            Войти
          </Button>
        </div>

        <Button size='large' onClick={() => navigate("/register")} type="default">Зарегистрироваться</Button>
      </div>
    </CenterContent>
  );
};

export default Login;
