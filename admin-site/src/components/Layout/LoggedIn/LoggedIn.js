import Head from "next/head";
import Router from "next/router";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../../helpers/authHelper";
import {
    CalendarOutlined,
    PieChartOutlined,
    UserOutlined,
    ReadOutlined,
    ShoppingOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { isAuth } from "../../../helpers/authHelper";
import { Button, Layout, Menu as Menus } from "antd";

function LoggedIn({ children, title, isNotAllowed }) {
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState("");
    const { Header, Footer, Sider, Content } = Layout;

    useEffect(() => {
        setCurrent("/" + Router.pathname.split("/")[1]);
    }, []);

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem("Dashboard", "/", <PieChartOutlined />),
        getItem("Event", "/event", <CalendarOutlined />),
        getItem("Menu", "/menu", <ReadOutlined />),
        getItem("Order", "/order", <ShoppingOutlined />),
        getItem("Category", "/category", <UnorderedListOutlined />),
        getItem("User", "/user", <UserOutlined />),
    ];

    useEffect(() => {
        if (!isAuth()) {
            Router.push("/login");
        }

        if (isNotAllowed) {
            Router.back();
        }
    }, []);

    if (!isAuth() || isNotAllowed) {
        return "";
    }

    const onClick = (e) => {
        const key = e.key;
        Router.push(key);
        setCurrent(key);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Saso Application" />
                <link rel="icon" href="/admin/favicon.ico" />
            </Head>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme="dark">
                <div
                    style={{
                        height: 64,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}>
                    <img
                        style={{
                            maxWidth: "2rem",
                        }}
                        src="/admin/iwkz-logo-no-text.svg"
                        alt="IWKZ logo"
                    />
                </div>
                <Menus
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    items={items}
                    onClick={onClick}
                    selectedKeys={[current]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: "#00000000",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                    }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "83.333%",
                            margin: "0 auto",
                        }}>
                        <div />
                        <img
                            style={{
                                maxWidth: "3rem",
                            }}
                            src="/admin/iwkz_logo.png"
                            alt="IWKZ logo"
                        />
                        <Button
                            shape="circle"
                            icon={<LogoutOutlined />}
                            onClick={logout}
                        />
                    </div>
                </Header>
                <Content>{children}</Content>
                <Footer style={{ margin: "auto" }}>© 2021 IWKZ Al-Falah</Footer>
            </Layout>
        </Layout>
    );
}

export default LoggedIn;
