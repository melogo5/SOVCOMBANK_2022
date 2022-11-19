import React from "react";
import { Button, Dropdown, Typography, message, Space, Tooltip } from 'antd';
import "./Profile.css";
import useUserExist from "../../hook/useUserExist";

export const Profile: React.FC = () => {
  const user = useUserExist();
  const { Text, Title } = Typography;

  if (!user) return null;
  return (
    <div className="profile-wrapper">
      <Title>{user.name}</Title>
      <Title level={3}>{user.phone}</Title>
      <Title level={3}>{user.email}</Title>
    </div>
  );
}
