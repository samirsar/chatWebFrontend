import React, { useEffect, useState } from "react";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Form, Input, Layout, Menu, theme } from "antd";
import Cookies from "js-cookie";
import { UserType } from "../stores/features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { GetUserDetails, GetUsers } from "../stores/features/users/userThunks";
import MenuItem from "antd/es/menu/MenuItem";
import {
  GetMessages,
  SendMessages,
} from "../stores/features/messages/messageThunks";
import { getMessageBetweenSenderAndReceiver } from "../services/Apis/messageApi";

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
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.userSlice.users);
  const selectedUserDetail = useAppSelector(
    (state) => state.userSlice.userDetails
  );
  const messages = useAppSelector((state) => state.messageSlice);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [UserDetail, setUserDetail] = useState<UserType>();
  const [isSent, setIsSent] = useState<boolean>(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedUser, setSelectedUser] = useState<string>();
  const [form] = Form.useForm();

  const items: MenuItem[] = usersState.users
    .map((elm) => {
      if (elm.id != UserDetail?.id)
        return getItem(elm.userName, elm.id, <UserOutlined />);
      else return undefined;
    })
    .filter((elm): elm is MenuItem => elm !== undefined);
  const onSendMessage = (value: any) => {
    setIsSent(false);
    const body = {
      senderId: UserDetail?.id,
      receiverId: selectedUser,
      text: value.message,
    };
    dispatch(SendMessages({ body })).then(() => {
      setIsSent(true);
    });
    form.resetFields();
  };
  useEffect(() => {
    const data = Cookies.get("user");
    let userData: any = undefined;
    if (data) userData = JSON.parse(data).data;
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
    } else {
      navigate("/login");
    }
  }, [Cookies]);
  useEffect(() => {
    dispatch(GetUsers({}));
  }, []);
  useEffect(() => {
    if (selectedUser) {
      dispatch(GetUserDetails({ id: selectedUser }));
    }
  }, [selectedUser]);
  useEffect(() => {
    if (usersState.total_count && UserDetail) {
      const defauluser = usersState.users.find(
        (elm) => elm.id !== UserDetail.id
      );
      if (defauluser)
        setSelectedUser(() => {
          return defauluser.id;
        });
    }
  }, [usersState, UserDetail]);
  useEffect(() => {
    if (isSent && UserDetail && selectedUser) {
      dispatch(
        GetMessages({
          params: { senderId: UserDetail?.id, receiverId: selectedUser },
        })
      );
    }
  }, [isSent,UserDetail,selectedUser]);

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
          onClick={(value) => {
            setSelectedUser(value.key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{UserDetail?.userName}</Breadcrumb.Item>
            <Breadcrumb.Item>
              {selectedUserDetail.user?.userName}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {messages.messages.map((elm, index) => {
              return (
                <h3
                  key={index}
                  style={
                    selectedUser &&
                    (selectedUser == elm.receiverId)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {elm.text}
                </h3>
              );
            })}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <Form
            name="basic"
            layout="inline"
            onFinish={onSendMessage}
            style={{ width: "100%" }}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              style={{ width: "90%" }}
              name="message"
              rules={[
                { required: true, message: "Please please enter message!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                icon={<SendOutlined />}
                type="primary"
                htmlType="submit"
              />
            </Form.Item>
          </Form>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Room;
