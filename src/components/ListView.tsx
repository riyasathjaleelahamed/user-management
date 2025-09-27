import React from 'react';
import { Table, Button, Space, Avatar, Typography } from 'antd';
import type { TableProps } from 'antd';
import { Item } from '../redux/dataSlice';

interface ListViewProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete?: (id: number) => void;
}

const ListView: React.FC<ListViewProps> = ({ items, onEdit, onDelete }) => {
  // Define the columns for the table
  const columns: TableProps<Item>['columns'] = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      // We use a custom render function to show the Avatar next to the email
      render: (email, record) => (
        <Space>
          <Avatar src={record.avatar || 'https://via.placeholder.com/150'} />
          <Typography.Link href={`mailto:${email}`}>{email}</Typography.Link>
        </Space>
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Action',
      key: 'action',
      // Render function for the action buttons
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>
          {onDelete && (
            <Button type="primary" danger onClick={() => onDelete(record.id)}>
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={items}
      rowKey="id" // Use the 'id' field as the unique key for each row
      pagination={false} // <-- Add this line to disable pagination
    />
  );
};

export default ListView;