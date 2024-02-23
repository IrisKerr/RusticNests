import prisma from "@/app/config/db";
import React from "react";
import ClientSidePropertiesTable from "./properties-table-clientside";

async function PropertiesTable() {
  const properties = await prisma.property.findMany();
  console.log(properties);
  return <ClientSidePropertiesTable properties={properties} />;
}

export default PropertiesTable;
