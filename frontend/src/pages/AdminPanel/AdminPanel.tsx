import React, { FC, useEffect } from 'react';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { Button, List } from 'antd';
import { $user } from '../../context/user';
import { $users, getUsersFx, UserReviewRequest, userReviewFx } from '../../context/admin';

const PERSON = "de2e0148-029b-4206-8676-eb764a24bcb8";
const USER = "de2e0148-029b-4206-8676-eb764a24bcb9";
const ADMIN = "de2e0148-029b-4206-8676-eb764a24bcb0";

const ROLE_NAME = {
  [PERSON]: 'На проверке',
  [USER]: 'Клиент',
  [ADMIN]: 'Администратор'
}

interface IUser {
  created: Date;
  name: string;
  id: string;
  role: typeof PERSON | typeof USER | typeof ADMIN;
}

const AdminPanel: FC = () => {
  const IconText = ({ type, user }: { type: UserReviewRequest["type"], user: IUser }) => {
    const isPositive = type === 'approve';
    return <>
      <Button
        icon={isPositive ? <LikeOutlined /> : <DislikeOutlined />}
        onClick={() => {
          const request: UserReviewRequest = { id: user.id, type };
          userReviewFx(request);
        }}
        type={isPositive ? 'primary' : 'ghost'}
      >
        {isPositive ? 'Принять' : 'Отклонить'}
      </Button>
    </>
  };

  const navigate = useNavigate();
  const [user, users] = useUnit([$user, $users]);

  useEffect(() => {
    console.log("rerender");
    if (!user || user && !user.admin) {
      navigate('/');
      return;
    }

    getUsersFx();
  }, []);

  return (
    <div className="page-cardLink">
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user: IUser) => (
          <List.Item
            key={user.id}
            actions={user.role === PERSON ? [
              <IconText type="approve" key="users-approve-btn" user={user}/>
            ] : []}
          >
            <List.Item.Meta
              title={user.name}
              description={ROLE_NAME[user.role]}
            />
          </List.Item>)}
      />
    </div>
  );
};

export default AdminPanel;
