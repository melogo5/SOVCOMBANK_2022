import React, { FC } from 'react';
import { useUnit } from "effector-react";
import { Button, Checkbox, Input } from 'antd';
import { useForm } from 'effector-react-form';

import { loginForm, loginFormSubmit, $user } from './model';

import "./Login.css";
import { InputField } from '../../form/input';
import { useEffect } from 'react';

const Login: FC = () => {
    const { controller, handleSubmit } = useForm({ form: loginForm });

    const user = useUnit($user);

    useEffect(() => console.log({user}), [user]);

    return (
        <div className="page-login">
            <InputField controller={controller({ name: "login" })} label={"Login"} />

            <Input.Password />

            <Checkbox>Remember me</Checkbox>

            <Button onClick={loginFormSubmit} type="primary" htmlType="submit">
                Submit
            </Button>


            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
};

export default Login;