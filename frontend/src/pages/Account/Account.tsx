import React, { useState, useMemo } from "react";
import { Button, Typography, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

import { SettingOutlined } from "@ant-design/icons";

import { BoxShadow } from "../../components/BoxShadow/BoxShadow";

import "./Account.css";
import { Switcher } from "../../components/Switcher/Switcher";

const CURRENCIES = {
    ["RUB"]: "₽",
    ["EUR"]: "€"
} as any;

export const Account: React.FC = () => {
    const { Text, Title } = Typography;
    const [value, setValue] = useState('RUB');

    //const data =
    //запрос за данными
    const data = {
        total: 12612,
        currency: "RUB",
        card: "**** 4012",
        secondCurrency: "EUR",
        secondCurrencyLabel: "Евро",
        secondTotal: 1890
    }

    const total = useMemo(() => {
        return value === "RUB" ? data.total : data.secondTotal;
    }, [value]);

    const options = useMemo(() => {
        return [
            { label: 'Рубли', value: data.currency },
            { label: data.secondCurrencyLabel, value: data.secondCurrency }
        ];
    }, [data]);

    const onChange = (value: string) => {
        console.log('radio1 checked', value);
        setValue(value);
    };

    return (
        <div className="account-wrapper">
            <BoxShadow>
                <Switcher options={options} callback={onChange} active={value} />
            </BoxShadow>
            <BoxShadow>
                <Title level={2}>
                    Баланс
                </Title>
                <Title className="account-amount">
                    {`${total} ${CURRENCIES[value]} `}
                </Title>
            </BoxShadow>
            <BoxShadow>
                <div className="card-header-settings">
                    <Title className="card-header-number" level={2}>
                        {`Карта: ${data.card} `}
                    </Title>
                    <SettingOutlined className="card-settings-icon" />
                </div>
                <div className="account-card-actions">
                    <Button className="account-card-actions-btn card-btn-in">Пополнить</Button>
                    <Button className="account-card-actions-btn card-btn-out">Вывести</Button>
                </div>
            </BoxShadow>
            <BoxShadow className="account-change-card">
                <Button className="account-card-actions-btn">Сменить карту</Button>
            </BoxShadow>
        </div>
    );
}