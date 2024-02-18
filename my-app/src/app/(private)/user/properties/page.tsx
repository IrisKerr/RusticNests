import PageTitle from "@/app/components/page-title";
import React from "react";
import PropertiesTable from "./_components/properties-form/properties-table";
import LinkButton from "@/app/components/link-button";

function Properties() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <LinkButton
          title="Create Property"
          path="/user/properties/create-property"
        />
      </div>
      <PropertiesTable />
    </div>
  );
}

export default Properties;
