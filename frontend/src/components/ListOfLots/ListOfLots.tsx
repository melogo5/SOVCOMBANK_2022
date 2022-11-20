import React, { useState } from "react";
import { useUnit } from "effector-react";
import { $exchange, $exchangeOrders } from "../../context/market";
import { ListOfLotsItem } from "./ListOfLotsItem";
import { BoxShadow } from "../BoxShadow/BoxShadow";
import { Button, Select, Typography, message, Drawer, Radio, Space  } from 'antd';

import "./ListOfLots.css";
import { useEffect } from "react";


export const ListOfLots: React.FC = () => {
    const [exchangeId, exchangeOrders] = useUnit([$exchange, $exchangeOrders]);
    const { Text, Title } = Typography;
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({
        amount: 0,
        currency: [{sign: "P"}, {sign: "E"}],
        rate: 0,
        type: ""
    });

    const handleOpenItem = (e: any) => {
        setOpen(true)
        setItem(e);
    }

    useEffect(() => {
        console.log(item)
    }, [item]);

    return (
        <div className="list-of-lots-wrapper">
            <BoxShadow>
                {exchangeOrders && exchangeOrders.map(e => <ListOfLotsItem item={e} onClick={() => handleOpenItem(e)} />)}
            </BoxShadow>

            <Drawer
                title="Подтверждение покупки"
                placement={"bottom"}
                closable={true}
                onClose={() => setOpen(false)}
                open={open}
            >
                {/* <ListOfLotsItem item={item} onClick={() => {}} /> */}
                
                <Title>{`Покупка ${item.amount} ${item.currency[item.type === "buy" ? 1: 0].sign}`}</Title>
                <Text>{`По курсу ${item.rate} ${item.currency[item.type === "buy" ? 0: 1].sign} / ${item.currency[item.type === "buy" ? 1: 0].sign}`}</Text>
                <Text>{`Вы заплатите ${item.rate * item.amount} ${item.currency[item.type === "buy" ? 0 : 1].sign}`}</Text>
                <Button onClick={() => setOpen(false)} className="list-items-drawer-btn">Подтвердить</Button>
            </Drawer>
        </div>
    );
}