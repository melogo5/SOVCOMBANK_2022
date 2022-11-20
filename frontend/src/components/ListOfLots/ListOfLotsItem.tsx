import React from "react";
import { Typography } from "antd";

import "./ListOfLots.css";

interface ListOfLotsItemProps {
    item: any;
    onClick: (e: any ) => void;
}

export const ListOfLotsItem: React.FC<ListOfLotsItemProps> = ({ item, onClick }) => {
    const { Text } = Typography;
    const rateSigns = `${item.currency[item.type === "buy" ? 0 : 1].sign} / ${item.currency[item.type === "buy" ? 1 : 0].sign}`

    return (
        <div className="list-of-lots-item" onClick={onClick}>
            <div className="lot-item-amount">
                <Text>{`Покупка ${item.amount} ${item.currency[item.type === "buy" ? 1 : 0].sign}`}</Text>
                <Text>{`Курс:  ${+item.rate.toFixed(2)} ${rateSigns}`}</Text>
            </div>
        </div>
    );
}