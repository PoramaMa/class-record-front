import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { useState } from "react";
const { Option } = Select;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
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
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
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
        name="studentCode"
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
        name="firstname"
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
        name="lickname"
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
          <Option value="male">ชาย</Option>
          <Option value="female">หญิง</Option>
          <Option value="other">อื่นๆ</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="gradelevel"
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
