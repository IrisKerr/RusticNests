import { Property } from "@prisma/client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

interface ActionsProps {
  record: Property;
}

function Actions({ record }: ActionsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <Button
        size="small"
        onClick={() =>
          router.push(`/user/properties/edit-property/${record.id}`)
        }
      >
        <i className="ri-edit-2-line"></i>
      </Button>
      <Button size="small">
        <i className="ri-file-copy-line"></i>
      </Button>
      <Button size="small">
        <i className="ri-delete-bin-6-line"></i>
      </Button>
    </div>
  );
}

export default Actions;
