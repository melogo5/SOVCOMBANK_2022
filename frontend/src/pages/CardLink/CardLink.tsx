import React, { FC } from 'react';
import { CreditCardOutlined } from '@ant-design/icons';
import { useUnit } from "effector-react";
import { Button, Checkbox, Input } from 'antd';
import { useForm } from 'effector-react-form';

import { cardLinkForm, cardLinkFormSubmit, $user } from './model';

import "./CardLink.css";
import { InputField } from '../../form/input';
import { useEffect } from 'react';

const CardLink: FC = () => {
    const { controller, handleSubmit } = useForm({ form: cardLinkForm });

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
                className="page-cardLink-submitBtn"
                onClick={cardLinkFormSubmit}
                type="primary"
                htmlType="submit">
                    Добавить 
            </Button>
        </div>
    );
};

export default CardLink;