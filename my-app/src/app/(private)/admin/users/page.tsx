"use client";
import { getAllUsers } from "@/actions/users";
import PageTitle from "@/app/components/page-title";
import React, { useEffect } from "react";
import UsersTable from "./_components/users-table";

function AdminUsersPage() {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result: any = await getAllUsers();
        console.log(result);
        setUsers(result?.data || []);
      } catch (error) {
        console.error("An error occurred while requesting the database", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <PageTitle title="Users" />
      <UsersTable users={users} />
    </>
  );
}

export default AdminUsersPage;
