import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { Button, Select, Typography, message, Space, Tooltip } from 'antd';

// import { DownOutlined, UserOutlined } from '@ant-design/icons';

import "./Market.css";
import { BoxShadow } from "../../components";
import useUserExist from "../../hook/useUserExist";
import { $markets, loadMarketsFx, exchangeSelect, $exchange } from "../../context/market";
import Exchange from "../Exchange/Exchange";

export const Market: React.FC = () => {
  const user = useUserExist();
  const navigate = useNavigate();
  const [markets, exchange] = useUnit([$markets, $exchange]);

  useEffect(() => { loadMarketsFx() }, []);

  return (
    <div className="market-wrapper">
      <BoxShadow>
        <div className="currency-pair-choice">
          <Select
            size='large'
            placeholder="Выберите валютную пару"
            options={markets}
            onChange={exchangeSelect}
          />
        </div>
        <Button
          size='large'
          className="create-lot-btn"
          onClick={() => navigate("/lotPlacement")}
          disabled={!exchange}
        >
          Создать лот
        </Button>
      </BoxShadow>

      <Exchange />
    </div>
  );
}
