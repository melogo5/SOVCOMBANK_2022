import React from "react";
import { useUnit } from "effector-react";
import { Typography } from 'antd';
import { FileSyncOutlined } from "@ant-design/icons";
import "./ProcessReview.css";
import { $user } from '../../context/user';
import { CenterContent } from "../../components";

export const ProcessReview: React.FC = () => {
  const { Text, Title } = Typography;
  const user = useUnit($user);

  console.log(user);

  return (
    <CenterContent taCenter>
      <div>
        {user !== null && user.name &&<Text>Здравствуйте, {user.name}!</Text>}
        <br/>
        <FileSyncOutlined className="process-review-icon" />
        <Title>Проверяем данные</Title>
        <Text>Подождите пока мы проверим ваши данные и документы</Text>
      </div>
    </CenterContent>
  );
}
