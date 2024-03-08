import { getQueriesByPropertyId } from "@/actions/queries";
import { Property, Query } from "@prisma/client";
import { Modal, Table, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";

interface Props {
  showQueriesModal: boolean;
  setshowQueryModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProperty: Property | null;
}

function PropertyQueries({
  showQueriesModal,
  setshowQueryModal,
  selectedProperty,
}: Props) {
  const [Loading, setLoading] = React.useState<boolean>(false);
  const [queries, setQueries] = React.useState<Query[]>([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true);
        const response: any = await getQueriesByPropertyId(
          selectedProperty?.id || ""
        );
        if (response.error) throw new Error(response.error);
        setQueries(response?.data);
        setLoading(false);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedProperty) fetchQueries();
  }, [selectedProperty]);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Customer Email",
      dataIndex: "email",
      key: "email",
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
    <Modal
      title={`Queries for ${selectedProperty?.name}`}
      open={showQueriesModal}
      onCancel={() => setshowQueryModal(false)}
      width={1000}
      footer={null}
    >
      <Table columns={columns} dataSource={queries} loading={Loading} />
    </Modal>
  );
}

export default PropertyQueries;
