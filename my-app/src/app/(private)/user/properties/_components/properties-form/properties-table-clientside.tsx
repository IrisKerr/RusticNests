import { deleteProperty } from "@/actions/properties";
import Actions from "@/app/components/Actions";
import Loader from "@/app/components/Loader";
import { Property } from "@prisma/client";
import { Button, Table, message } from "antd";
import dayjs from "dayjs";
import React from "react";
import PropertyQueries from "./property-queries";
import Link from "next/link";

function ClientSidePropertiesTable({ properties }: { properties: Property[] }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showQueries, setShowQueries] = React.useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] =
    React.useState<Property | null>(null);

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
      render: (text: any, record: Property) => (
        <Link href={`/property/${record.id}`}>{text}</Link>
      ),
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
    {
      title: "Queries",
      dataIndex: "queries",
      render(text: any, record: Property) {
        return (
          <Button
            size="small"
            onClick={() => {
              setShowQueries(true);
              setSelectedProperty(record);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Table
        dataSource={properties}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />
      {showQueries && (
        <PropertyQueries
          selectedProperty={selectedProperty}
          setshowQueryModal={setShowQueries}
          showQueriesModal={showQueries}
        />
      )}
    </>
  );
}

export default ClientSidePropertiesTable;
