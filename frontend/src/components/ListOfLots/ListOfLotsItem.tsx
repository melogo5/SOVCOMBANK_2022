import React from "react";
import { Typography } from "antd";

import "./ListOfLots.css";

interface ListOfLotsItemProps {
    item: any;
}

export const ListOfLotsItem: React.FC<ListOfLotsItemProps> = ({ item }) => {
    const { Text } = Typography;
    const rateSigns = `${item.currency[item.type === "buy" ? 0 : 1].sign} / ${item.currency[item.type === "buy" ? 1 : 0].sign}`

    return (
        <div className="list-of-lots-item">
            <div className="lot-item-amount">
                <Text>{`Покупка ${item.amount} ${item.currency[item.type === "buy" ? 1 : 0].sign}`}</Text>
                <Text>{`Курс:  ${+item.rate.toFixed(2)} ${rateSigns}`}</Text>
            </div>
        </div>
    );
}