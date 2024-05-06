"use client";
import { User } from "@prisma/client";
import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

function UsersTable({ users }: { users: User[] }) {
  const columns = [
    {
      title: "Profile Pic",
      dataIndex: "profilePic",
      key: "profilePic",
      render: (profilePic: string) => {
        return (
          <img
            src={profilePic}
            alt="Profile Pic"
            width="40"
            className="rounded-full"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registered On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        return dayjs(createdAt).format("DD MMMM, YYYY");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: User) => {
        if (record.isActive) {
          return "Active";
        }
        return "Inactive";
      },
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean) => {
        if (isAdmin) {
          return "Yes";
        }
        return "No";
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={users} />
    </>
  );
}

export default UsersTable;
