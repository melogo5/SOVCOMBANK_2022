import React from "react";
import { useUnit } from "effector-react";
import { $exchange, $exchangeOrders } from "../../context/market";
import { ListOfLotsItem } from "./ListOfLotsItem";
import { BoxShadow } from "../BoxShadow/BoxShadow";

import "./ListOfLots.css";


export const ListOfLots: React.FC = () => {
    const [exchangeId, exchangeOrders] = useUnit([$exchange, $exchangeOrders]);

    return (
        <div className="list-of-lots-wrapper">
            <BoxShadow>
                {exchangeOrders && exchangeOrders.map(e => <ListOfLotsItem item={e} />)}
            </BoxShadow>
        </div>
    );
}