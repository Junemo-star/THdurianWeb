import React from 'react';
import { FloatButton } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const FloatButtonComponent = ({ onClick }) => {
  return (
    <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ right: 20, bottom: 20 }} onClick={onClick} />
  );
};

export default FloatButtonComponent;
