// Exchange -
import React, { FC } from "react";
import { useUnit } from "effector-react";
import { $exchange } from "../../context/market";

const Exchange: FC = () => {
  const exchange = useUnit($exchange);

  if (!exchange) return null;
  return (
    <>
      биржа
      {exchange}
    </>
  );
};

export default Exchange;
