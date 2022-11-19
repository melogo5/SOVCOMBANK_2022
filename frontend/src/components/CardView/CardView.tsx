import React from "react";
import { Typography } from 'antd';

import "./CardView.css";

interface CardViewProps {
    number: string;
    date: string;
    code: string | number;
    name: string;
}

const cardType = {
    4: "VISA",
    5: "MASTER CARD",
    2: "MIR"
} as any;

//4-v 5-mc 2-mr oter - card

export const CardView: React.FC<CardViewProps> = (props) => {
    const { name, date, code, number } = props;
    const { Text, Title } = Typography;

    return (
        <div className="card-view-wrapper">
            <div className="card-view-header">
                <Title level={5} className="card-view-default">{cardType[number[0]] || "CARD"}</Title>
            </div>
            <Title level={4} className="card-view-default card-view-number">{number}</Title>
            <Title level={4} className="card-view-default card-view-name">{name}</Title>
            <div className="card-view-date-code">
                <Text className="card-view-default card-view-date">{date}</Text>
                <Text className="card-view-default card-view-code">{code}</Text>
            </div>
        </div>
    );
}