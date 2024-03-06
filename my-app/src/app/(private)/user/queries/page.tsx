"use client";
import { getUserQueries } from "@/actions/queries";
import PageTitle from "@/app/components/page-title";
import React, { useEffect } from "react";
import UserQueriesTable from "./_components/user-queries-table";

function QueriesPage() {
  const [queries, setQueries] = React.useState([]);

  useEffect(() => {
    const fetchUserQueries = async () => {
      try {
        const result = await getUserQueries();
        console.log(result);
        setQueries(result?.queries || []);
      } catch (error) {
        console.error(
          "An error occurred while requesting the user's properties",
          error
        );
      }
    };

    fetchUserQueries();
  }, []);

  return (
    <div>
      <PageTitle title="Queries" />
      <UserQueriesTable queries={queries} />
    </div>
  );
}

export default QueriesPage;
