import React from "react";
import { Link } from "react-router-dom";

import { UserOutlined, TransactionOutlined, WalletOutlined, PlusOutlined } from "@ant-design/icons";

import "./NavMenu.css";

export const NavMenu: React.FC = () => {
    // const navigate = useNavigate();

    const replace = (path: string) => {
        if (location.pathname === path) return;

        location.replace("/dashboard")
    }

    return (
        // <BrowserRouter>
        // <Routes>
        <div className="nav-menu-wrapper">
            <Link to={"/dashboard"}>
                <div className="menu-icon-wrapper" >
                    <WalletOutlined className="menu-icon" />
                </div>
            </Link>
            <Link to={"/"}>
            <div className="menu-icon-wrapper">
                <TransactionOutlined className="menu-icon" />
            </div>
            </Link>
            <Link to={"/"}>
            <div className="menu-icon-wrapper">
                <PlusOutlined className="menu-icon" />
            </div>
            </Link>
            <Link to={"/"}>
            <div className="menu-icon-wrapper">
                <UserOutlined className="menu-icon" />
            </div>
            </Link>
        </div>
        // {/* </Routes> */}
        // {/* </BrowserRouter> */}
    );
}