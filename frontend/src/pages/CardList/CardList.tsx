import React, { FC, useEffect, useState } from 'react';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { Button, Radio } from 'antd';
import { $user } from '../../context/user';
import { $activeCard, $cards, cardListFx, cardSelectFx } from '../../context/card';
import { $users, getUsersFx, UserReviewRequest, userReviewFx } from '../../context/admin';
import { ROLE, ROLE_NAME, IUser } from '../../interfaces';

const CardList: FC = () => {
  const navigate = useNavigate();
  const [user, users] = useUnit([$user, $users]);
  const [activeCard, cards] = useUnit([$activeCard, $cards]);

  const [selectedCard, setSelectedCard] = useState(0);

  const getRadioGroupItems = () => {
    const radioBtns: React.ReactNode[] = [];
    for (const card of cards) {
        radioBtns.push(<Radio value={card.id}>{<div>{card.cardNumber} {card.cardHolder}</div>}</Radio>)
    }
    return <Radio.Group onChange={(e) => cardSelectFx({cardId: e.target.value})} value={activeCard}>
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
