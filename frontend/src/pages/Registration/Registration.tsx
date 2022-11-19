import React, { FC } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useUnit } from "effector-react";
import { Button } from 'antd';
import { useForm } from 'effector-react-form';

import { registrationForm, registrationFormSubmit, $user } from '../../context/user';

import "./Registration.css";
import { InputField } from '../../form/input';
import { useEffect } from 'react';
import { PasswordInputField } from '../../form/passwordInput';
import { CenterContent } from '../../components';

const Registration: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { controller } = useForm({ form: registrationForm });
  const user = useUnit($user);

  useEffect(() => {
    console.log({ user });

    if (!user) return;
    console.log(location.pathname);
    if (!user.user) navigate("/review");
}, [user]);

  return (
    <CenterContent taCenter>
      <div className="formRegistrationWrapper">
        <InputField
          controller={controller({ name: "name" })}
          label={"Регистрация"}
          lableClassName="label-registration"
          inputClassName="registration-name-field"
          placeholder="Иван Иванов"
        />

        <PasswordInputField className="registration-password-field" controller={controller({ name: "password" })} />
        <PasswordInputField className="registration-password-field" controller={controller({ name: "passwordConfirm" })} />

        <div className="registration-buttons">
          <Button onClick={registrationFormSubmit} type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>

          <Button onClick={() => navigate("/login")} type="default">Войти</Button>
        </div>

      </div>
    </CenterContent>
  );
};

export default Registration;
