import { Property } from "@prisma/client";
import { Table } from "antd";
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
  ];
  return <Table dataSource={properties} columns={columns} rowKey="id" />;
}

export default ClientSidePropertiesTable;
