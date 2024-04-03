"use client";
import PageTitle from "@/app/components/page-title";
import React, { Suspense } from "react";
import PropertiesTable from "./_components/properties-form/properties-table";
import LinkButton from "@/app/components/link-button";
import Filters from "@/app/components/filters";
import Loader from "@/app/components/Loader";

function Properties({ searchParams }: { searchParams: any }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <LinkButton
          title="Create Property"
          path="/user/properties/create-property"
        />
      </div>
      <Suspense fallback={<Loader />}>
        <Filters searchParams={searchParams} />
        <PropertiesTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default Properties;
