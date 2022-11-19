import React, { FC } from 'react';
import { useUnit } from "effector-react";
import { Button, Checkbox, Input } from 'antd';
import { useForm } from 'effector-react-form';

import { registrationForm, registrationFormSubmit, $user } from './model';

import "./Registration.css";
import { InputField } from '../../form/input';
import { useEffect } from 'react';
import { PasswordInputField } from '../../form/passwordInput';
import { CenterContent } from '../../components';

const Registration: FC = () => {
    const { controller, handleSubmit } = useForm({ form: registrationForm });

    const user = useUnit($user);

    useEffect(() => console.log({ user }), [user]);

    return (
        // <div className="page-registration">
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

                    <Button onClick={registrationFormSubmit} type="default" htmlType="submit">
                        Войти
                    </Button>
                </div>

            </div>
        </CenterContent>

            /* <pre>{JSON.stringify(user, null, 2)}</pre> */ 
        // </div>
    );
};

export default Registration;