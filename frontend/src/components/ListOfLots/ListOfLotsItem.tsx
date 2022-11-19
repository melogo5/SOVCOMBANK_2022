import React from "react";

import "./ListOfLots.css";

interface ListOfLotsItemProps {
    amount: string | number;
    currency: string;
    sign: string;
    pricePerOne: string | number;
    total: string | number;
}

export const ListOfLotsItem: React.FC<ListOfLotsItemProps> = (props) => {
    const { amount, total, pricePerOne, currency, sign } = props;

    return (
        <div className="list-of-lots-item">
            <div className="lot-item-amount">{`${amount} ${sign}`}</div>
        </div>
    );
}