import { Property, Query } from "@prisma/client";
import { Modal } from "antd";
import React from "react";

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
  return (
    <Modal
      title={`Queries for ${selectedProperty?.name}`}
      open={showQueriesModal}
      onCancel={() => setshowQueryModal(false)}
      width={1000}
    ></Modal>
  );
}

export default PropertyQueries;
