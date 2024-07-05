import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { updateProduct } from '../repository/updateProduct';

const { Option } = Select;

const EditProductModal = ({ isModalVisible, handleCancel, product, fetchProducts }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const updatedProduct = { ...product, ...values, filePath: file };
      await updateProduct(updatedProduct);
      message.success('Product updated successfully');
      fetchProducts();
      handleCancel();
    } catch (error) {
      message.error('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = ({ file }) => {
    setFile(file);
  };

  return (
    <Modal
      title="Edit Product"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={product}
      >
        <Form.Item name="id" label="Product ID" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the product price' }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="stockStatus" label="Stock Status" rules={[{ required: true, message: 'Please select the stock status' }]}>
          <Select>
            <Option value="INSTOCK">In Stock</Option>
            <Option value="OUTOFSTOCK">Out of Stock</Option>
          </Select>
        </Form.Item>
        <Form.Item name="productType" label="Product Type" rules={[{ required: true, message: 'Please select the product type' }]}>
          <Select>
            <Option value="LATEST">Latest</Option>
            <Option value="REGULAR">Regular</Option>
            {/* Add other options as needed */}
          </Select>
        </Form.Item>
        <Form.Item name="filePath" label="Image">
          <Upload
            name="file"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
