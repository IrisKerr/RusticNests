import PageTitle from "@/app/components/page-title";
import React from "react";
import PropertiesForm from "../_components/properties-form";

function CreatePropertyPage() {
  return (
    <div>
      <PageTitle title="Create Property" />
      <PropertiesForm />
    </div>
  );
}

export default CreatePropertyPage;
