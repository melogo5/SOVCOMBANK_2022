import React from "react";
import { Link } from "react-router-dom";
import { useUnit } from "effector-react";
import { $user } from '../../context/user';

import { UserOutlined, TransactionOutlined, WalletOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";

import "./NavMenu.css";

export const NavMenu: React.FC = () => {
    // const navigate = useNavigate();
    const user = useUnit($user);

    return (
        <div className="nav-menu-wrapper">
            <Link to={"/dashboard"}>
                <div className={`menu-icon-wrapper ${location.pathname === "/dashboard" ? "menu-icon-wrapper-active" : ""}`} >
                    <WalletOutlined className="menu-icon" />
                </div>
            </Link>
            <Link to={"/market"}>
                <div className={`menu-icon-wrapper ${location.pathname === "/market" ? "menu-icon-wrapper-active" : ""}`}>
                    <TransactionOutlined className="menu-icon" />
                </div>
            </Link>
            <Link to={"/cardOrder"}>
                <div className={`menu-icon-wrapper ${location.pathname === "/" ? "menu-icon-wrapper-active" : ""}`}>
                    <PlusOutlined className="menu-icon" />
                </div>
            </Link>
            <Link to={"/profile"}>
                <div className={`menu-icon-wrapper ${location.pathname === "/profile" ? "menu-icon-wrapper-active" : ""}`}>
                    <UserOutlined className="menu-icon" />
                </div>
            </Link>
            {user && user.admin && (
                <Link to={"/admin-panel"}>
                    <div className="menu-icon-wrapper">
                        <SettingOutlined className="menu-icon" />
                    </div>
                </Link>
            )}
        </div>
    );
}
