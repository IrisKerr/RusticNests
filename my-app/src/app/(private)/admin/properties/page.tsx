"use client";
import {
  findAllProperties,
  findPropertiesByFilters,
} from "@/actions/properties";
import Filters from "@/app/components/filters";
import PageTitle from "@/app/components/page-title";
import { Property } from "@prisma/client";
import React, { useEffect } from "react";
import ClientSidePropertiesTable from "../../user/properties/_components/properties-form/properties-table-clientside";

function AdminPropertiesPage({ searchParams }: { searchParams: string }) {
  const [properties, setProperties] = React.useState<Property[]>([]);
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        if (!searchParams) {
          const result = await findAllProperties();
          setProperties(result?.data || []);
        }
        const result = await findPropertiesByFilters(searchParams);
        setProperties(result?.data || []);
      } catch (error) {
        console.error("An error occurred while requesting the database", error);
      }
    };

    fetchAllProperties();
  }, [searchParams]);

  return (
    <>
      <PageTitle title="Manage Properties" />
      <Filters searchParams={searchParams} />
      <ClientSidePropertiesTable properties={properties} fromAdmin />
    </>
  );
}

export default AdminPropertiesPage;
