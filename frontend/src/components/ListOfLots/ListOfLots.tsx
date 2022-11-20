import React, { useState } from "react";
import { useUnit } from "effector-react";
import { $exchange, $exchangeOrders, exchangeOrdersFx } from "../../context/market";
import { ListOfLotsItem } from "./ListOfLotsItem";
import { BoxShadow } from "../BoxShadow/BoxShadow";
import { Button, Select, Typography, message, Drawer, Radio, Space } from 'antd';
import useUserExist from "../../hook/useUserExist";

import "./ListOfLots.css";
import { useEffect } from "react";
import api from "../../scripts/api";


export const ListOfLots: React.FC = () => {
    const [exchangeId, exchangeOrders] = useUnit([$exchange, $exchangeOrders]);
    const user = useUserExist();
    const { Text, Title } = Typography;
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({
        amount: 0,
        currency: [{ sign: "P" }, { sign: "E" }],
        rate: 0,
        type: ""
    });

    const handleOpenItem = (e: any) => {
        setOpen(true)
        setItem(e);
    }


    const handleOeration = async () => {
        setOpen(false);
        await api("submit/operation", {
            //@ts-ignore
            id: item.id
        })
        //@ts-ignore
        exchangeOrdersFx({ marketId: exchangeId, userId: user.id });
    }

    return (
        <div className="list-of-lots-wrapper">
            <BoxShadow>
                {exchangeOrders && exchangeOrders.map(e => <ListOfLotsItem key={e.id} item={e} onClick={() => handleOpenItem(e)} />)}
            </BoxShadow>

            <Drawer
                title="Подтверждение покупки"
                placement={"bottom"}
                closable={true}
                onClose={() => setOpen(false)}
                open={open}
            >
                {/* <ListOfLotsItem item={item} onClick={() => {}} /> */}

                <Title>{`Покупка ${item.amount} ${item.currency[item.type === "buy" ? 1 : 0].sign}`}</Title>
                <Text>{`По курсу ${item.rate.toFixed(3)} ${item.currency[item.type === "buy" ? 0 : 1].sign} / ${item.currency[item.type === "buy" ? 1 : 0].sign}`}</Text>
                <br />
                <Text>{`Вы заплатите ${+(item.rate * item.amount).toFixed(3)} ${item.currency[item.type === "buy" ? 0 : 1].sign}`}</Text>
                <Button onClick={handleOeration} className="list-items-drawer-btn">Подтвердить</Button>
            </Drawer>
        </div>
    );
}