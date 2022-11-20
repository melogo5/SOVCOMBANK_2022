import React, { FC } from 'react';
import { CreditCardOutlined } from '@ant-design/icons';
import { useUnit } from "effector-react";
import { Button, Checkbox, Input } from 'antd';
import { useForm } from 'effector-react-form';

import { cardLinkForm, cardLinkFormSubmit } from '../../context/card';
import { $user } from '../../context/user';

import "./CardLink.css";
import { InputField } from '../../form/input';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CardLink: FC = () => {
    const { controller, handleSubmit } = useForm({ form: cardLinkForm });
    const navigate = useNavigate();
    const user = useUnit($user);

    useEffect(() => console.log({ user }), [user]);

    return (
        <div className="page-cardLink">
            <InputField
                inputClassName="card-number-field"
                lableClassName="card-number-label"
                controller={controller({ name: "cardNumber" })}
                prefix={<CreditCardOutlined style={{ color: 'rgba(0,0,0,.45)' }}/>}
                maskPlaceholder={null}
                mask="9999 9999 9999 9999"
                label={"Номер карты"}
                placeholder="XXXX XXXX XXXX XXXX"
            />
            <InputField
                inputClassName="holder-name-field"
                lableClassName="holder-name-label"
                controller={controller({ name: "holderName" })}
                label={"Держатель карты"}
                placeholder="Пупкин В. В."
            />
            <div className="flex-container">
                <InputField
                    className="valid-thru"
                    inputClassName="valid-thru-field"
                    lableClassName="valid-thru-label"
                    controller={controller({ name: "validThru" })}
                    label={"Срок действия"}
                    mask="99 / 99"
                    placeholder="MM/YY"
                />
                <InputField
                    className="cvc"
                    inputClassName="cvc-field"
                    lableClassName="cvc-label"
                    controller={controller({ name: "CVC" })}
                    label={"CVC"}
                    mask="999"
                    placeholder="CVC/CVC2"
                />
            </div>
            <Button
                size='large'
                className="page-cardLink-submitBtn"
                onClick={() => {
                    if (user)  {
                        cardLinkFormSubmit({userId: user.id})
                    } else {
                        cardLinkFormSubmit({userId: 'adb85a15-4776-430f-9886-2c697395ffd6'});
                    }
                    navigate(-1);
                }}
                type="primary"
                htmlType="submit">
                    Добавить 
            </Button>
        </div>
    );
};

export default CardLink;