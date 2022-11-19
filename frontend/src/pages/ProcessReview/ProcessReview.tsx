import React from "react";
import { FileSyncOutlined } from "@ant-design/icons";
import { Typography } from 'antd';

import { CenterContent } from "../../components";

import "./ProcessReview.css";

export const ProcessReview: React.FC = () => {
    const { Text, Title } = Typography;

    return (
        <CenterContent taCenter>
            <div>
                <FileSyncOutlined className="process-review-icon" />
                <Title>Проверяем данные</Title>
                <Text>Подождите пока мы проверим ваши данные и документы</Text>
            </div>
        </CenterContent>
    );
}