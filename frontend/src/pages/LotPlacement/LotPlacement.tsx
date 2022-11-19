import React from "react";
import { SwapOutlined } from "@ant-design/icons";

import { LotPlacementBlock } from "./LotPlacementBlock";
import { Button } from 'antd';

import "./LotPlacement.css";

export const LotPlacement: React.FC = () => {
    const handleSwap = () => {

    }

    return (
        <div className="lot-placement-wrapper">
            <LotPlacementBlock type="buy" currency="RUB" />
            <div className="lot-placement-swap-btn-container">
                <Button
                    onClick={handleSwap}
                    className="lot-placement-swap-btn"
                    icon={<SwapOutlined />}
                />
            </div>
            <LotPlacementBlock type="sell" currency="EUR" />
            <Button className="lot-placement-create">Создать лот</Button>
        </div>
    );
}