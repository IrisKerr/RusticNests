import prisma from "@/app/config/db";
import React, { useEffect } from "react";
import ClientSidePropertiesTable from "./properties-table-clientside";
import {
  findAllProperties,
  findAllPropertiesFromUser,
} from "@/actions/properties";
import { Property } from "@prisma/client";
import { getCurrentUserFromMongoDB } from "@/actions/users";

async function PropertiesTable({ searchParams }: { searchParams: any }) {
  const [properties, setProperties] = React.useState<Property[]>([]);
  // const user = await getCurrentUserFromMongoDB();

  useEffect(() => {
    const fetchUserProperties = async (user: any, params: any) => {
      try {
        const result = await findAllPropertiesFromUser(user, params);
        setProperties(result?.data || []);
      } catch (error) {
        console.error(
          "An error occurred while requesting the user's properties",
          error
        );
      }
    };

    const fetchData = async () => {
      const user = await getCurrentUserFromMongoDB();
      console.log(user);
      fetchUserProperties(user, searchParams);
    };

    fetchData();
  }, [searchParams]);

  return <ClientSidePropertiesTable properties={properties} />;
}

export default PropertiesTable;
