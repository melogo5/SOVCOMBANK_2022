import React, { useState } from "react";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Typography, message, Space, Tooltip } from 'antd';

import { DownOutlined, UserOutlined } from '@ant-design/icons';

import "./CardOrder.css";
import { BoxShadow } from "../../components";
import { CardView } from "../../components/CardView/CardView";

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
    const [country, setCountry] = useState(countries[0]);
    const items: MenuProps['items'] = countries.map(e => ({
        label: e.label,
        key: e.id
    }));

    const handleMenuClick = (e: any) => {
        setCountry(countries.find(c => c.id === e.key) as any)
    }

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <div className="card-order-wrapper">
            <BoxShadow className="card-order-create">
                <Dropdown menu={menuProps}>
                    <Button>
                        <Space>
                            {country.label}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
                <Button className="card-order-create-btn">Заказать</Button>
            </BoxShadow>
            <BoxShadow>
                <CardView name="ANDREY POTASHIN" number="4800 5553 5512 1234" date="01/24" code="123"/>
            </BoxShadow>
        </div>
    );
}