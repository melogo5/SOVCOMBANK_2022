import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent, useUnit } from "effector-react"; // selector
import { Button, Dropdown, Typography, message, Space, Tooltip } from 'antd';
import "./Profile.css";
import { $user } from "../../context/user"; // store

export const Profile: React.FC = () => {
    const navigate = useNavigate();
    const user = useUnit($user);

    const { Text, Title } = Typography;1

    useEffect(() => {
        if (!user) navigate("/login");
    }, []);

    if (!user) {
        return null;
    };

    return (
        <div className="profile-wrapper">
            <Title>{user.name}</Title>
            <Title level={3}>{user.phone}</Title>
            <Title level={3}>{user.email}</Title>
        </div>
    );
}