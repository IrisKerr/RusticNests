import { Property, Query } from "@prisma/client";
import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

function UserQueriesTable({ queries }: { queries: Query[] }) {
  const columns = [
    {
      title: "Property",
      dataIndex: "property",
      key: "propertyKey",
      render: (property: Property) => property.name,
    },
    {
      title: "Quote Amount",
      dataIndex: "quoteAmount",
      key: "quoteAmountKey",
      render: (quoteAmount: number) => `${quoteAmount} €`,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "messageKey",
    },
    {
      title: "Send at",
      dataIndex: "createdAt",
      key: "createdAtKey",
      render: (createdAt: Date) => {
        return dayjs(createdAt).format("DD MMM YYYY hh:mm A");
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={queries} rowKey="id" />
    </div>
  );
}

export default UserQueriesTable;
