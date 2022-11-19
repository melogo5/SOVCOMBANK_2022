import React, { FC, useState } from 'react';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { useUnit } from "effector-react";
import { Button, List } from 'antd';

import { $user, getUsers, getUsersFx } from '../../context/user';
import api from '../../scripts/api';

import { useEffect } from 'react';
import { createEffect } from 'effector';

const PERSON = "de2e0148-029b-4206-8676-eb764a24bcb8";
const USER = "de2e0148-029b-4206-8676-eb764a24bcb9";
const ADMIN = "de2e0148-029b-4206-8676-eb764a24bcb0";

const ROLE_NAME = {
  [PERSON]: 'Не подтвержденный пользовтель',
  [USER]: 'Участник',
  [ADMIN]: 'Администратор'
}

interface IUser {
  created: Date;
  name: string;
  id: string;
  role: typeof PERSON | typeof USER | typeof ADMIN;
}

type TReview = 'decline' | 'approve';

const AdminPanel: FC = () => {
  const IconText = ({ type, user }: { type: TReview, user: IUser }) => {
    const isPositive = type === 'approve';
    return <>
      <Button
        icon={isPositive ? <LikeOutlined /> : <DislikeOutlined />}
        onClick={() => reviewUser(user.id, type)}
        type={isPositive ? 'primary' : 'ghost'}
      >
        {isPositive ? 'Принять' : 'Отклонить'}
      </Button>
    </>
  };

  const getUsersList = async () => {
    const users = await api('users/list', {});
    return users;
  };
  
  const reviewUser = async (id: string, type: TReview) => {
    console.log(type);
    const result = await api('users/review', {id, type});
    const newUsers = await getUsersList();
    setUsersList(newUsers.data);
    return result;
  };
  
  const [usersList, setUsersList] = useState();
  const navigate = useNavigate();
  const user = useUnit($user);

  useEffect(() => {
    console.log({ user });
    if (!user || user && !user.admin) {
        navigate('/');
    }
  }, [user]);

  useEffect(() => {
    // TODO Вынести наружу
    getUsersList().then(users => {
        setUsersList(users.data);
    })
  }, []);

  return (
    <div className="page-cardLink">
      <List
        itemLayout="horizontal"
        dataSource={usersList}
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