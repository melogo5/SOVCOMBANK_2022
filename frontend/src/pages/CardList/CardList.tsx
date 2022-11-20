import React, { FC, useEffect, useState } from 'react';
import { CreditCardOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { Radio } from 'antd';
import { $user } from '../../context/user';
import { $activeCard, $cards, cardListFx, cardSelectFx } from '../../context/card';
import { $users } from '../../context/admin';
import './CardList.css';
import { BoxShadow } from '../../components';
import { CardView } from '../../components/CardView/CardView';

const CardList: FC = () => {
  const navigate = useNavigate();
  const [user, users] = useUnit([$user, $users]);
  const [activeCard, cards] = useUnit([$activeCard, $cards]);

  const getRadioGroupItems = () => {
    const radioBtns: React.ReactNode[] = [];
    for (const card of cards) {
        radioBtns.push(<Radio key={card.id} value={card.id}>{
            <BoxShadow>
              <CardView
                number={'**** ' + card.cardNumber.split(' ').reverse()[0]}
                code="***"
                date={card.cardExpireDate}
                name={card.cardHolder.toUpperCase()} />
            </BoxShadow>
            }</Radio>)
    }
    return <Radio.Group
      className='card-list-radioGroup'
      size="large"
      onChange={(e) => cardSelectFx({cardId: e.target.value})}
      value={activeCard && activeCard.id}>
        {radioBtns}
    </Radio.Group>
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    cardListFx({ userId: user.id });
  }, []);

  return (
    <div className="page-cardList">
        {getRadioGroupItems()}
    </div>
  );
};

export default CardList;
