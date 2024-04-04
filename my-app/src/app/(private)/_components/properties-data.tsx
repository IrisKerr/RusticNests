/* eslint-disable @next/next/no-async-client-component */
"use client";
import {
  findAllProperties,
  findPropertiesByFilters,
} from "@/actions/properties";
import { Property } from "@prisma/client";
import { Button, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

async function PropertiesData({ searchParams }: { searchParams: any }) {
  const [properties, setProperties] = useState<Property[]>([]);

  function formatString(str: string) {
    // Supprimer les underscores et remplacer par des espaces
    const noUnderscores = str.replaceAll("_", " ");
    // Diviser la chaîne en mots, capitaliser la première lettre de chaque mot
    // et convertir le reste en minuscules
    const formatted = noUnderscores
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return formatted;
  }

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (searchParams) {
          const result = await findPropertiesByFilters(searchParams);
          setProperties(result?.data || []);
          return;
        }
        const result = await findAllProperties();
        setProperties(result?.data || []);
      } catch (error) {
        console.error("An error occurred while fetching properties", error);
      }
    };

    fetchProperties();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 ">
      {properties?.map((property, index) => (
        <div
          key={index}
          className="m-3 lg:m-5 bg-white border rounded shadow-lg border-solid border-gray-200 overflow-hidden"
        >
          <Image
            className="object-cover w-full h-80 rounded-t property-main-image"
            src={property.images[0]}
            alt=""
            width={500}
            height={200}
          />
          <div className="p-4 flex flex-col">
            <span className="text-xl text-primary font-bold">
              {property.name}
            </span>
            <span className="text-gray-700 text-xs mt-2">
              {property.town}, {formatString(property.country)}
            </span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-primary text-l">
              {property.price} €
              <Tag className="ml-2 p-1 px-3 text-xs bg-header rounded">
                {property.status}
              </Tag>
            </span>
            <Link
              className="text-sm text-primary font-semibold"
              href={`property/${property.id}`}
            >
              <Button>View Details</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertiesData;
