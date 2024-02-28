import PageTitle from "@/app/components/page-title";
import React from "react";
import PropertiesForm from "../../_components/properties-form";
import { findPropertyById } from "@/actions/properties";

interface Props {
  params: {
    id: string;
  };
}

async function EditPropertyPage({ params }: Props) {
  const property = await findPropertyById(params.id);

  return (
    <div>
      <PageTitle title="Edit Property" />
      <PropertiesForm initialValues={property} isEdit={true} />
    </div>
  );
}

export default EditPropertyPage;
