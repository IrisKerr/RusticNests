import { Property } from "@prisma/client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

interface ActionsProps {
  recordId: string;
  onDelete: (id: string) => void;
}

function Actions({ recordId, onDelete }: ActionsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <Button
        size="small"
        onClick={() =>
          router.push(`/user/properties/edit-property/${recordId}`)
        }
      >
        <i className="ri-edit-2-line"></i>
      </Button>
      <Button
        size="small"
        onClick={() => {
          router.push(`/user/properties/create-property?cloneFrom=${recordId}`);
        }}
      >
        <i className="ri-file-copy-line"></i>
      </Button>
      <Button
        size="small"
        onClick={() => {
          onDelete(recordId);
        }}
      >
        <i className="ri-delete-bin-6-line"></i>
      </Button>
    </div>
  );
}

export default Actions;
