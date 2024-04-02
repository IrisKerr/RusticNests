"use client";
import {
  furnishingTypes,
  propertyCountries,
  propertyStatuses,
  propertyTypes,
} from "@/constants";
import { Button, Form, Modal, Select, Tag } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Filters({ searchParams }: { searchParams: any }) {
  const [showFiltersModal, setShowFiltersModal] =
    React.useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const onFinish = (values: any) => {
    console.log(values);

    // Remove undefined or null values
    const formattedData: any = {};
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        formattedData[key] = values[key];
      }
    });

    // Construct query string
    const queryString = new URLSearchParams(formattedData).toString();
    router.push(`${pathname}?${queryString}`);
    setShowFiltersModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mx-2 my-4 p-4 border rounded-sm border-solid border-gray-300">
        <div>
          {Object.keys(searchParams).length === 0 ? (
            <span className="text-sm text-gray-500">No filters applied</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {Object.keys(searchParams).map((key) => {
                return (
                  <div key={key} className="capitalize flex flex-col">
                    <Tag
                      onClose={() => {
                        const newSearchParams = { ...searchParams };
                        delete newSearchParams[key];
                        // Construct query string
                        const queryString = new URLSearchParams(
                          newSearchParams
                        ).toString();
                        router.push(`${pathname}?${queryString}`);
                      }}
                      closeIcon
                      closable
                    >
                      <span className="text-primary text-sm">
                        {searchParams[key]}
                      </span>
                    </Tag>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex gap-5">
          <Button onClick={() => router.push(pathname)}>Clear</Button>
          <Button type="primary" onClick={() => setShowFiltersModal(true)}>
            Filters
          </Button>
        </div>
      </div>
      {showFiltersModal && (
        <Modal
          title={<h3 className="font-semibold text-primary">Select Filters</h3>}
          open={showFiltersModal}
          onCancel={() => setShowFiltersModal(false)}
          centered
          width={800}
          footer={null}
        >
          <Form
            onFinish={onFinish}
            layout="vertical"
            initialValues={searchParams}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <Form.Item label="Property Type" name="type">
                <Select options={propertyTypes} />
              </Form.Item>
              <Form.Item label="Furnishing" name="furnishing">
                <Select options={furnishingTypes} />
              </Form.Item>
              <Form.Item label="Rent / Sale" name="status">
                <Select options={propertyStatuses} />
              </Form.Item>
              <Form.Item label="Country" name="country">
                <Select options={propertyCountries} />
              </Form.Item>
            </div>
            <div className="mt-7 flex justify-end gap-5 items-center">
              <Button
                onClick={() => {
                  setShowFiltersModal(false);
                  router.push(pathname);
                }}
              >
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Apply
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default Filters;
