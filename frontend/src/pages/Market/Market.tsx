import React from "react";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Typography, message, Space, Tooltip } from 'antd';

import { DownOutlined, UserOutlined } from '@ant-design/icons';

import "./Market.css";
import { BoxShadow } from "../../components";

const variants = [
  "RUB/EUR",
  "RUB/THB",
  "RUB/VND"
];

export const Market: React.FC = () => {
  const navigate = useNavigate();

  const items: MenuProps['items'] = variants.map(e => ({
    label: e,
    key: e
  }));

  const handleMenuClick = () => {

  }

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="market-wrapper">
      <BoxShadow>
        <div className="currency-pair-choice">
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Выберите пару
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <Button className="create-lot-btn" onClick={() => navigate("/lotPlacement")}>Создать лот</Button>
      </BoxShadow>
    </div>
  );
}
