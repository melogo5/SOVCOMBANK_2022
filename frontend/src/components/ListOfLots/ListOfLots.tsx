import React from "react";
import { BoxShadow } from "../BoxShadow/BoxShadow";

import "./ListOfLots.css";

const items = [{
    amount: 3000,
    currency: "EUR",
    pricePerOne: 66,
    total: 198000
}, {
    amount: 400,
    currency: "EUR",
    pricePerOne: 68,
    total: 27200
}]

export const ListOfLots: React.FC = () => {

    return (
        <div className="list-of-lots-wrapper">
            <BoxShadow>

            </BoxShadow>
        </div>
    );
}