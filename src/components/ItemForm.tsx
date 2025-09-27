import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Item } from "../redux/dataSlice";

interface ItemFormProps {
  item?: Item | null;
  onSubmit: (values: any) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, onSubmit }) => {
  const [form] = Form.useForm();

  // Reset form whenever modal opens or item changes
  useEffect(() => {
    if (item) {
      form.setFieldsValue(item); // pre-fill for edit
    } else {
      form.resetFields(); // clear for add
    }
  }, [item, form]);

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields(); // reset after submit
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={item || { firstName: "", lastName: "", email: "", avatar: "" }}
      onFinish={handleFinish}
    >
      <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Profile Image URL" name="avatar">
        <Input placeholder="https://..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {item ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ItemForm;
