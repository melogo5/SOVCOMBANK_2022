import React from "react";
import { Button, Typography } from 'antd';

import { InputField } from '../../form/input';
import { BoxShadow } from "../../components";

import "./LotPlacement.css";

interface LotPlacementBlockProps {
    label?: string;
    currency: string;
    placeholder?: string;
    type: "sell" | "buy";
}

const CURRENCIES = {
    ["RUB"]: "₽",
    ["EUR"]: "€"
} as any;

export const LotPlacementBlock: React.FC<LotPlacementBlockProps> = props => {
    const { type, label, placeholder, currency } = props;
    const { Text, Title } = Typography;
    const title = label || (type === "buy" ? "Купить" : "Продать");

    return (
        <BoxShadow>
            <Title level={3} className="lot-placement-block-title">{title}</Title>
            <div>
                {/* <InputField></InputField> */}
                Сумма: 
                <input type="number" placeholder={placeholder} style={{border: "1px solid black", margin: "10px"}} />
                {CURRENCIES[currency]}
            </div>
            <div>
                {/* <InputField></InputField> */}
                Курс: 
                <input type="number" placeholder={placeholder} style={{border: "1px solid black", margin: "10px"}} />
                {CURRENCIES[currency]}
            </div>
            <div>
                Всего: %тут каклькулейтед общей суммы%
            </div>
        </BoxShadow>
    );
}