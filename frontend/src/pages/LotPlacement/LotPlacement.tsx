import React, { FC, useState } from "react";
import { useUnit } from "effector-react";
import { Button } from 'antd';
import { SwapOutlined } from "@ant-design/icons";
import { LotPlacementBlock } from "./LotPlacementBlock";
import { Switcher } from "../../components";
import { createOrderForm, createOrderFormChangeType } from "../../context/market";
import "./LotPlacement.css";

const options = [{
  value: "buy",
  label: "Купить"
}, {
  value: "sell",
  label: "Продать"
}];

export const LotPlacement: FC = () => {
  const meta = useUnit(createOrderForm.$meta);

  return (
    <div className="lot-placement-wrapper">
      <Switcher options={options} callback={createOrderFormChangeType} active={meta.type} />
      {/* ниже нужно прокинуть в type и currency из эффектора данные о том что за валюты мы покупаем/продаем */}
      <LotPlacementBlock />
      <Button
        size='large'
        className="lot-placement-create"
        disabled={!meta.rate}
        onClick={createOrderForm.submit}
      >
        Создать заявку
      </Button>
    </div>
  );
}
