import { Suspense } from "react";
import Filters from "../components/filters";
import PropertiesData from "./_components/properties-data";
import Loader from "../components/Loader";

export default async function Home() {
  return (
    <div className="flex justify-between">
      <Filters />
      <Suspense fallback={<Loader />}>
        <PropertiesData />
      </Suspense>
    </div>
  );
}
