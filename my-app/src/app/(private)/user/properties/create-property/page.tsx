import PageTitle from "@/app/components/page-title";
import React from "react";
import PropertiesForm from "../_components/properties-form";
import { findPropertyById } from "@/actions/properties";

async function CreatePropertyPage({ searchParams }: { searchParams: any }) {
  const clonedPropertyId = searchParams?.cloneFrom || "";
  let property: any = {};
  if (clonedPropertyId) {
    property = await findPropertyById(clonedPropertyId);
  }

  return (
    <div>
      <PageTitle title="Create Property" />
      <PropertiesForm initialValues={property ? property : {}} />
    </div>
  );
}

export default CreatePropertyPage;
