"use client";
import { findPropertyById } from "@/actions/properties";
import PageTitle from "@/app/components/page-title";
import { Property } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

function PropertyPage({ params: { id } }: Props) {
  const [property, setProperty] = useState<Property>({});
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const result = await findPropertyById(id);
        console.log(result);
        setProperty((result as Property) || {});
      } catch (error) {
        console.error("An error occurred while fetching property", error);
      }
    };

    fetchProperties();
  }, [id]);

  return (
    <div>
      <PageTitle title={property.name} />
      {property.images && property.images.length > 0 && (
        <Image
          className="object-cover w-full h-60 rounded-t"
          src={property.images?.[0]}
          alt=""
          width={800}
          height={300}
        />
      )}
    </div>
  );
}

export default PropertyPage;
