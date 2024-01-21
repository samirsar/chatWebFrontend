import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Cookies from "js-cookie";
import {
  UserType,
  userDetailsFailure,
} from "../stores/features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { GetUsers } from "../stores/features/users/userThunks";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const Room: React.FC = () => {
  const dispatch=useAppDispatch();
  const usersState=useAppSelector((state)=>state.userSlice.users);
  const navigate=useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [UserDetail, setUserDetail] = useState<UserType>();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
const items: MenuItem[] = usersState.users.map((elm)=>{
  return  getItem(elm.userName, elm.id, <UserOutlined />);
})
  useEffect(() => {
    const data = Cookies.get("user");
    let userData: any = undefined;
    if (data) 
    userData=JSON.parse(data).data;
    if (userData && userData.id) {
      setUserDetail(() => {
        return {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          userName: userData.userName,
          userType: userData.userType,
        };
      });
    }
    else
    {
      navigate('/login');
    }
  }, [Cookies]);
  useEffect(()=>{
    dispatch((GetUsers({})));
  },[])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{UserDetail?.userName}</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Room;
