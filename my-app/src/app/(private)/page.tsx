import { Suspense } from "react";
import Filters from "../components/filters";
import PropertiesData from "./_components/properties-data";
import Loader from "../components/Loader";

export default async function Home() {
  return (
    <div className="flex flex-col justify-between lg:mx-20">
      <Filters />
      <Suspense fallback={<Loader />}>
        <PropertiesData />
      </Suspense>
    </div>
  );
}
