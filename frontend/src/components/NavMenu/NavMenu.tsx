import React from "react";
import { Link } from "react-router-dom";

import { UserOutlined, TransactionOutlined, WalletOutlined, PlusOutlined } from "@ant-design/icons";

import "./NavMenu.css";

export const NavMenu: React.FC = () => {

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
            <Link to={"/"}>
                <div className={`menu-icon-wrapper ${location.pathname === "/" ? "menu-icon-wrapper-active" : ""}`}>
                    <PlusOutlined className="menu-icon" />
                </div>
            </Link>
            <Link to={"/profile"}>
                <div className={`menu-icon-wrapper ${location.pathname === "/profile" ? "menu-icon-wrapper-active" : ""}`}>
                    <UserOutlined className="menu-icon" />
                </div>
            </Link>
        </div>
    );
}