import Actions from "@/app/components/Actions";
import { Property } from "@prisma/client";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";

function ClientSidePropertiesTable({ properties }: { properties: Property[] }) {
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
      title: "Actions",
      dataIndex: "actions",
      render(record: Property) {
        return <Actions record={record} />;
      },
    },
  ];
  return <Table dataSource={properties} columns={columns} rowKey="id" />;
}

export default ClientSidePropertiesTable;
