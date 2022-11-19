import React from "react";
import { Button, Dropdown, Typography, message, Space, Tooltip } from 'antd';

import "./Profile.css";

export const Profile: React.FC = () => {
    const { Text, Title } = Typography;

    return (
        <div className="profile-wrapper">
            <Title>%username%</Title>
            <Title level={3}>%useremail%</Title>
        </div>
    );
}