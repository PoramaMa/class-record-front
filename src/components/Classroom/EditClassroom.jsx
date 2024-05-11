import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { env } from "../../env";
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
const EditClassroom = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();

  const [dataClassroomById, setClassroomById] = useState([]);

  const fetchClassroomById = async (id) => {
    try {
      const response = await axios.get(`${url}/classrooms/${atob(id)}`);
      setClassroomById(response.data);
      const { room_number, room_name, academic_year, teacher_name } =
        response.data;
      form.setFieldsValue({
        room_number,
        room_name,
        academic_year,
        teacher_name,
      });
    } catch (err) {
      console.log("fetchClassroomById err :: ", err);
    }
  };

  const onEditClassroom = async (values) => {
    try {
      const result = await axios.patch(`${url}/classrooms/${atob(id)}`, values);
      navigate("/classrooms?ref=all");
    } catch (err) {
      alert(err.message);
      console.log("onEditClassroom err :: ", err);
    }
  };

  const [isEdit, setIsEdit] = useState(false);

  const onEdit = async () => {
    setIsEdit(true);
  };

  useEffect(() => {
    fetchClassroomById(id);
  }, []);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onEditClassroom}
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
        name="room_number"
        label="Room Number"
        tooltip="123456"
        rules={[
          {
            required: true,
            message: "Please input your Room Number!",
            whitespace: true,
          },
        ]}
      >
        <Input disabled={!isEdit} />
      </Form.Item>

      <Form.Item
        name="room_name"
        label="Room Name"
        rules={[
          {
            required: true,
            message: "Please input your Room Name!",
            whitespace: true,
          },
        ]}
      >
        <Input disabled={!isEdit} />
      </Form.Item>

      <Form.Item
        name="academic_year"
        label="Academic Year"
        tooltip="พ.ศ."
        rules={[
          {
            required: true,
            message: "Please select Academic Year!",
          },
        ]}
      >
        <Select placeholder="select your Academic Year" disabled={!isEdit}>
          {[...Array(21)].map((_, index) => {
            const year = 2550 + index;
            return (
              <Option key={year} value={year.toString()}>
                {year}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="teacher_name"
        label="Teacher Name"
        rules={[
          {
            required: true,
            message: "Please input your Teacher Name!",
            whitespace: true,
          },
        ]}
      >
        <Input disabled={!isEdit} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        {isEdit ? (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        ) : (
          <a onClick={onEdit}>Edit</a>
        )}
      </Form.Item>
    </Form>
  );
};
export default EditClassroom;
