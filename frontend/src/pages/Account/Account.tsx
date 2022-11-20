import React, { useState, useMemo, useEffect } from "react";
import { Button, Typography, Drawer } from 'antd';
import { useNavigate } from "react-router-dom";
import type { RadioChangeEvent } from 'antd';

import { SettingOutlined, PlusOutlined } from "@ant-design/icons";

import { BoxShadow } from "../../components/BoxShadow/BoxShadow";

import "./Account.css";
import { Switcher } from "../../components/Switcher/Switcher";
import { $activeCard } from '../../context/card';
import CardList from "../CardList/CardList";
import { useUnit } from "effector-react";
import { CardView } from "../../components/CardView/CardView";
import { $user, $userBalance, changebalanceFx, getBalanceFx } from "../../context/user";

const CURRENCIES = {
    ["RUB"]: "₽",
    ["EUR"]: "€"
} as any;

export const Account: React.FC = () => {
    const { Text, Title } = Typography;
    const user = useUnit($user);
    const userBalance = useUnit($userBalance);
    const activeCard = useUnit($activeCard);
    const [value, setValue] = useState('RUB');
    const [cardSelectDrawerOpen, setCardSelectDrawerOpen] = useState(false);
    const navigate = useNavigate();

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

    const changeBalance = () => {
        // @ts-ignore
        const delta = Math.random() * 1000;
        changebalanceFx({
            userId: user && user.id,
            delta
        });
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
                    {`${Number( user && user.id ? userBalance : 1000).toFixed(2)} ${CURRENCIES[value]} `}
                </Title>
            </BoxShadow>
            <BoxShadow>
                <div className="card-header-settings">
                    {activeCard && activeCard.id ? (<CardView
                        number={'**** ' + activeCard.cardNumber.split(' ').reverse()[0]}
                        code="***"
                        date={activeCard.cardExpireDate}
                        name={activeCard.cardHolder.toUpperCase()}/>) : (
                    <Title className="card-header-number" level={2}>
                        {`Карта: ${data.card} `}
                    </Title>)}
                </div>
                <div className="account-card-actions">
                    <Button size='large' onClick={changeBalance} className="account-card-actions-btn card-btn-in">Пополнить с этой карты</Button>
                    <Button size='large' onClick={changeBalance} className="account-card-actions-btn card-btn-out">Вывести на эту карту</Button>
                </div>
            </BoxShadow>
            <BoxShadow className="account-change-card">
                <Button size='large' className="account-card-actions-btn" onClick={() => setCardSelectDrawerOpen(true)}>Выбрать другую карту</Button>
                <Button size='large' onClick={() => navigate("/cards/append")} className="account-card-actions-btn"><><PlusOutlined />   Добавить новую карту</></Button>
            </BoxShadow>
            <Drawer title="Выберите карту"
                    placement="bottom"
                    size="large"
                    extra={
                        <Button size='large' type="primary" onClick={() => setCardSelectDrawerOpen(false)}>
                        ОК
                        </Button>
                    }
                    onClose={() => setCardSelectDrawerOpen(false)}
                    open={cardSelectDrawerOpen}>
                <CardList></CardList>
            </Drawer>
        </div>
    );
}