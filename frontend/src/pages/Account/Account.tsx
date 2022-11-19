import React from "react";
import { Typography } from 'antd';

const CURRENCIES = {
    ["RUB"]: "₽"
} as any;

export const Account: React.FC = () => {
    const { Text, Title } = Typography;
    
    //const data =
    //запрос за данными
    const data = {
        total: 12612,
        currency: "RUB",
        card: "**** 4012"
    }
 
    return (
        <div>
            <Title>
                {`Баланс: ${data.total} ${data.currency ? CURRENCIES[data.currency] : CURRENCIES.RUB}`}
            </Title>
        </div>
    );
}