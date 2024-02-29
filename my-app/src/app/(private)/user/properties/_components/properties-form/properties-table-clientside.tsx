import { deleteProperty } from "@/actions/properties";
import Actions from "@/app/components/Actions";
import Loader from "@/app/components/Loader";
import { Property } from "@prisma/client";
import { Table, message } from "antd";
import dayjs from "dayjs";
import React from "react";

function ClientSidePropertiesTable({ properties }: { properties: Property[] }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await deleteProperty(id);
      if (response?.error) throw new Error(response.error);
      message.success(response?.message);
      setIsLoading(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: string) => (
        <span>
          {text} <span>-.€</span>
        </span>
      ),
    },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: Date) => {
        return dayjs(createdAt).format("DD MMM YYYY HH:mm A");
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (updatedAt: Date) => {
        return dayjs(updatedAt).format("DD MMM YYYY HH:mm A");
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render(text: any, record: Property) {
        return <Actions recordId={record.id} onDelete={onDelete} />;
      },
    },
  ];

  return (
    <Table
      dataSource={properties}
      columns={columns}
      rowKey="id"
      loading={isLoading}
    />
  );
}

export default ClientSidePropertiesTable;
