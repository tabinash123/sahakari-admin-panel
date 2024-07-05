import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addProduct } from '../repository/addProduct '; // Adjust the import path as necessary

const { Item: FormItem } = Form;
const { Option } = Select;

const AddProductModal = ({ isModalVisible, handleCancel, fetchProducts }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = useState(false);

  const handleAddProduct = async (values) => {
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('productType', values.productType);
      formData.append('description', values.description);
      if (fileList.length > 0) {
        formData.append('file', fileList[0].originFileObj);
      }

      const response = await addProduct(formData);
      if (response.success) {
        message.success(response.message);
        fetchProducts(); // Re-fetch products after adding a new one
        form.resetFields();
        setFileList([]);
      } else {
        message.error(response.message);
      }
      handleCancel();
    } catch (error) {
      message.error('Failed to add product');
    } finally {
      setFormLoading(false);
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Add Product"
      visible={isModalVisible}
      onOk={form.submit}
      onCancel={handleCancel}
      confirmLoading={formLoading}
    >
      <Form form={form} layout="vertical" onFinish={handleAddProduct}>
        <FormItem name="name" label="Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
          <Input />
        </FormItem>
        <FormItem name="price" label="Price" rules={[{ required: true, message: 'Please enter the product price' }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </FormItem>
        <FormItem name="productType" label="Product Type" rules={[{ required: true, message: 'Please select the product type' }]}>
          <Select placeholder="Select a product type">
            <Option value="LATEST">Latest</Option>
            <Option value="REGULAR">Regular</Option>
          </Select>
        </FormItem>
        <FormItem name="description" label="Description">
          <Input />
        </FormItem>
        <FormItem name="file" label="Image" rules={[{ required: true, message: 'Please upload the product image' }]}>
          <Upload
            accept="image/*"
            showUploadList={true}
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
