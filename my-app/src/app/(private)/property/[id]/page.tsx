"use client";
import { findPropertyById } from "@/actions/properties";
import LinkButton from "@/app/components/link-button";
import PageTitle from "@/app/components/page-title";
import { Property } from "@prisma/client";
import { Button, Carousel, Divider, Tag } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import QueryModal from "../_components/query-modal";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

function PropertyPage({ params: { id } }: Props) {
  const router = useRouter();
  const [property, setProperty] = useState<Property>({});

  function capitalizeWords(str: string) {
    if (typeof str === "string") {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      return "";
    }
  }

  const getAttributeDetails = ({
    name,
    value,
  }: {
    name: string;
    value: any;
  }) => {
    return (
      <div className="flex justify-between">
        <span className="text-sm text-rgay-600">{name}</span>
        <span className="text-sm text-rgay-600">{value}</span>
      </div>
    );
  };

  const getSectionTitle = (title: string) => {
    return (
      <div>
        <h3 className="text-xl font-bold text-primary m-0">{title}</h3>
        <hr className="border border-solid border-gray-300 my-3" />
      </div>
    );
  };

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary">
          {capitalizeWords(property?.name)}
        </h2>
        <div>
          <Button type="primary" onClick={() => router.push("/")}>
            Back to properties
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-2">
          {property.images && property.images.length > 0 && (
            <Carousel autoplay autoplaySpeed={2800}>
              {property.images.map((image, index) => (
                <div key={index}>
                  <Image
                    className="object-cover w-full h-96 lg:h-[550px] rounded-md"
                    src={image}
                    alt={image}
                    width={1200}
                    height={500}
                  />
                </div>
              ))}
            </Carousel>
          )}

          <div className="text-sm text-gray-600 pt-4 text-justify">
            {property.description}
          </div>

          <div className="text-l lg:text-l font-bold text-primary flex items-center justify-end">
            <Tag className=" ml-5 flex items-center text-gray-700 text-xs px-5 py-2">
              for {property.status}
            </Tag>
            <Tag className="ml-5 flex items-center text-gray-700 text-xs px-5 py-2">
              {property.price} €
            </Tag>
          </div>
        </div>

        <div className="bg-white col-span-1 border border-solid border-gray-300 rounded p-5">
          <div className="flex flex-col">{getSectionTitle("Amenities")}</div>
          <div className="flex flex-col gap-1">
            {getAttributeDetails({
              name: "bedrooms",
              value: property.bedrooms,
            })}
            {getAttributeDetails({
              name: "bathrooms",
              value: property.bathrooms,
            })}
            {getAttributeDetails({
              name: "floors",
              value: property.floors,
            })}
            {getAttributeDetails({
              name: "area",
              value: `${property.area} m²`,
            })}
            {getAttributeDetails({
              name: "furnishing",
              value: property.furnishing,
            })}
            {getAttributeDetails({
              name: "price",
              value: `${property.price} -.€`,
            })}
            {getAttributeDetails({
              name: "status",
              value: property.status,
            })}
          </div>
          <div className="flex flex-col mt-7">{getSectionTitle("Address")}</div>
          <div className="flex flex-col gap-1">
            {getAttributeDetails({
              name: "Town",
              value: property.town,
            })}
            {getAttributeDetails({
              name: "Zipcode",
              value: property.pincode,
            })}
            {getAttributeDetails({
              name: "Country",
              value: property.country,
            })}
            {getAttributeDetails({
              name: "Adress",
              value: property.address,
            })}
          </div>

          {property.showOwnerContact && (
            <div>
              <div className="flex flex-col mt-7">
                {getSectionTitle("Owner Details")}
              </div>
              <div className="flex flex-col gap-1">
                {getAttributeDetails({
                  name: "Owner Name",
                  value: property.ownerName,
                })}
                {getAttributeDetails({
                  name: "Owner Email",
                  value: property.ownerEmail,
                })}
                {getAttributeDetails({
                  name: "Owner PhoneNumber",
                  value: property.ownerPhoneNumber,
                })}
              </div>
              <QueryModal propertyId={property.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyPage;
