// Exchange -
import React, { FC } from "react";
import { useUnit } from "effector-react";
import { $exchange, $exchangeOrders } from "../../context/market";

const Exchange: FC = () => {
  const [exchangeId, exchangeOrders] = useUnit([$exchange, $exchangeOrders]);

  if (!exchangeId) return null;
  return (
    <>
      биржа
      <p>{exchangeId}</p>
      <pre>{JSON.stringify(exchangeOrders || [], null, 2)}</pre>
    </>
  );
};

export default Exchange;
