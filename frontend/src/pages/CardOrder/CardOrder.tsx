import React, { useState, useEffect } from "react";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Typography, message, Space, Tooltip } from 'antd';

import { DownOutlined, UserOutlined } from '@ant-design/icons';

import "./CardOrder.css";
import { BoxShadow } from "../../components";
import { CardView } from "../../components/CardView/CardView";
import { useUnit } from "effector-react";
import { $currencyList, currencyListFx } from "../../context/market";
import { $activeCard } from "../../context/card";

const countries = [{
    id: "DE",
    label: "Германия"
}, {
    id: "VNM",
    label: "Вьетнам"
}, {
    id: "THA",
    label: "Таиланд"
}];

export const CardOrder: React.FC = () => {
    const [currencyList, activeCard] = useUnit([$currencyList, $activeCard]);
    const [country, setCountry] = useState(currencyList[0]);
    const items: MenuProps['items'] = countries.map(e => ({
        label: e.label,
        key: e.id
    }));

    useEffect(() => {
        currencyListFx({});
    }, []);
    useEffect(() => {
        setCountry(currencyList[0]);
    }, [currencyList]);

    const handleMenuClick = (e: any) => {
        setCountry(currencyList.find(c => c.id === e.key) as any)
    }

    const menuProps = {
        items: currencyList.map((currency) => {
            return {
                key: currency.id,
                label: currency.country
            }
        }),
        onClick: handleMenuClick,
    };

    return (
        <div className="card-order-wrapper">
            <BoxShadow className="card-order-create">
                <Dropdown menu={{
                    items: currencyList.map((currency) => {
                        return {
                            key: currency.id,
                            label: currency.country
                        }
                    }),
                    onClick: handleMenuClick
                }}>
                    <Button size='large'>
                        <Space>
                            {country && country.country}
                        </Space>
                    </Button>
                </Dropdown>
                <Button size='large' className="card-order-create-btn">Заказать</Button>
            </BoxShadow>
            <BoxShadow>
                {activeCard && activeCard.id ? (
                <CardView
                    number={'**** ' + activeCard.cardNumber.split(' ').reverse()[0]}
                    code="***"
                    date={activeCard.cardExpireDate}
                    name={activeCard.cardHolder.toUpperCase()}/>) :
                <CardView name="ANDREY POTASHIN" number="4800 5553 5512 1234" date="01/24" code="123"/>}
            </BoxShadow>
        </div>
    );
}