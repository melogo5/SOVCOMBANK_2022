import React, { FC } from 'react';
import { Button } from 'antd';
import { useForm } from 'effector-react-form';
import { useNavigate } from "react-router-dom";
import { registrationForm, registrationFormSubmit, $user } from '../../context/user';
import useLoginNavigate from "../../hook/useLoginNavigate";
import "./Registration.css";
import { InputField } from '../../form/input';
import { PasswordInputField } from '../../form/passwordInput';
import { CenterContent } from '../../components';

const Registration: FC = () => {
  const { controller } = useForm({ form: registrationForm });
  const navigate = useNavigate();
  useLoginNavigate();

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

        <InputField
          controller={controller({ name: "email" })}
          inputClassName="registration-email-field"
          placeholder="Электронная почта"
        />

        <InputField
          controller={controller({ name: "phone" })}
          inputClassName="registration-phone-field"
          placeholder="Телефон"
        />

        <PasswordInputField className="registration-password-field" controller={controller({ name: "password" })} />
        <PasswordInputField className="registration-password-field" controller={controller({ name: "passwordConfirm" })} />

        <div className="registration-buttons">
          <Button size='large' onClick={registrationFormSubmit} type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>

          <Button size='large' onClick={() => navigate("/login")} type="default">Войти</Button>
        </div>

      </div>
    </CenterContent>
  );
};

export default Registration;
