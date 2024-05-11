import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import { env } from "../env";
const { Option } = Select;

const url = `${env.service_url}`;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const FormStudent = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{
        maxWidth: 950,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="student_code"
        label="Student Code"
        tooltip="SCXXXX"
        rules={[
          {
            required: true,
            message: "Please input your student code!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: "Please select title!",
          },
        ]}
      >
        <Select placeholder="select your title">
          <Option value="ด.ช.">ด.ช.</Option>
          <Option value="ด.ญ.">ด.ญ.</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="fname"
        label="First Name"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your First Name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lname"
        label="Last Name"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your Last Name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="ชาย">ชาย</Option>
          <Option value="หญิง">หญิง</Option>
          <Option value="อื่นๆ">อื่นๆ</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="grade_level"
        label="Grade Level"
        rules={[
          {
            required: true,
            message: "Please select Grade Level!",
          },
        ]}
      >
        <Select placeholder="select your Grade Level">
          <Option value="1">ป.1</Option>
          <Option value="2">ป.2</Option>
          <Option value="3">ป.3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="birthdate"
        label="Birth Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormStudent;
