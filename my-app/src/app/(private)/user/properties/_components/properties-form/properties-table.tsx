import prisma from "@/app/config/db";
import React, { useEffect } from "react";
import ClientSidePropertiesTable from "./properties-table-clientside";
import { findAllProperties } from "@/actions/properties";
import { Property } from "@prisma/client";

async function PropertiesTable() {
  const [properties, setProperties] = React.useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const result = await findAllProperties();
        setProperties(result?.data || []);
      } catch (error) {
        console.error(
          "An error occurred while requesting the properties",
          error
        );
      }
    };

    fetchProperties();
  }, []);

  return <ClientSidePropertiesTable properties={properties} />;
}

export default PropertiesTable;
