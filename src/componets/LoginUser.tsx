import { Button, Col, Form, Input, Row } from "antd";
import { loginUser } from "../stores/features/users/userThunks";
import { useAppDispatch } from "../stores/store";
import { useNavigate } from "react-router-dom";
export default function LoginUser() {
  const navigate=useNavigate();
   const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */
  
  const onFinish = () => {
    form.validateFields().then((values:any)=>{
      const body={
        userName:values.user.user_name,
        password:values.user.password,
      }
      dispatch(loginUser({body})).then((data)=>{
        if(data.payload.success)
        navigate('/room');
      });
    })
  
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
    <Col span={6}>
      <Form
        form={form}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "user_name"]}
          label="User Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button style={{marginLeft:'1rem'}}  onClick={()=>{
            navigate('/register')
          }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Col>
  </Row>
  )
}
