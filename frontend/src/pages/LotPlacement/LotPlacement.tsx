import React, { useState } from "react";
import { SwapOutlined } from "@ant-design/icons";

import { LotPlacementBlock } from "./LotPlacementBlock";
import { Button } from 'antd';

import "./LotPlacement.css";
import { Switcher } from "../../components";

const options = [{
    value: "buy",
    label: "Купить"
}, {
    value: "sell",
    label: "Продать"
}]

interface LotPlacementProps {
    firstCurrency: string;
    secondCurrency: string;
}

export const LotPlacement: React.FC = () => {
    // const { firstCurrency, secondCurrency} = props;
    const [active, setActive] = useState("buy");

    const handlechange = (value: string) => {
        setActive(value);
    }

    return (
        <div className="lot-placement-wrapper">
            <Switcher options={options} callback={handlechange} active={active} />
            {/* ниже нужно прокинуть в type и currency из эффектора данные о том что за валюты мы покупаем/продаем */}
            <LotPlacementBlock type={active as any} currency={active === "buy" ? "RUB": "EUR"} />
            <Button size='large' className="lot-placement-create">Создать лот</Button>
        </div>
    );
}