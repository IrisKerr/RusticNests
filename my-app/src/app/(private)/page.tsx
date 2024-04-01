import { Suspense } from "react";
import Filters from "../components/filters";
import PropertiesData from "./_components/properties-data";
import Loader from "../components/Loader";

export default async function Home({ searchParams }: { searchParams: any }) {
  const key = JSON.stringify(searchParams);

  return (
    <div className="flex flex-col justify-between lg:mx-20">
      <Filters searchParams={searchParams} />
      <Suspense fallback={<Loader />} key={key}>
        <PropertiesData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
