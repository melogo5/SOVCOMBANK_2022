import React, { FC } from "react";
import { Button, Typography } from 'antd';
import { useUnit } from "effector-react";
import { $exchangeData, createOrderForm } from "../../context/market";
import { InputField } from '../../form/input';
import { BoxShadow } from "../../components";
import "./LotPlacement.css";
import { useForm } from "effector-react-form";

interface LotPlacementBlockProps {
  label?: string;
  placeholder?: string;
}

export const LotPlacementBlock: FC<LotPlacementBlockProps> = props => {
  const { label, placeholder = "1000" } = props;
  const { Text, Title } = Typography;

  const { controller } = useForm({ form: createOrderForm });
  const [exchangeData, meta] = useUnit([$exchangeData, createOrderForm.$meta]);

  const title = label || (meta.type === "buy" ? "купить" : "продать");

  if (!exchangeData) return null;
  const signs = exchangeData.currency.map((c: any): string => c.sign);
  const [from, to] = meta.type === "buy"
    ? [signs[1], signs[0]]
    : [signs[0], signs[1]];

  return (
    <BoxShadow>
      <div>
        <InputField
          controller={controller({ name: "from" })}
          label={<>Я хочу {title}</>}
          placeholder={placeholder}
          prefix={from}
        />
      </div>
      <div>
        <InputField
          controller={controller({ name: "to" })}
          label={<>В обмен на</>}
          placeholder={placeholder}
          prefix={to}
        />
      </div>
      {Boolean(meta.rate) && (
        <div>
          <Text>Примечание. Обмен произойдет по курсу:</Text>
          <br />
          <Text>1 {from} = {meta.rate.toFixed(5)} {to}</Text>
        </div>
      )}
      {/* <pre>{JSON.stringify(exchangeData, null, 2)}</pre> */}
    </BoxShadow>
  );
}
