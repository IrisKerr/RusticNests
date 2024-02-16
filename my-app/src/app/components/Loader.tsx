import React from "react";
import { Spin } from "antd";

function Loader() {
  return (
    <div className="flex items-center justify-center mt-20">
      <Spin />
    </div>
  );
}

export default Loader;
