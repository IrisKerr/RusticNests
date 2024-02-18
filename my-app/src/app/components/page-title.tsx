import React from "react";

interface Props {
  title: string;
}

function PageTitle({ title }: Props) {
  return <h1 className="text-xl font-bold text-primary my-5">{title}</h1>;
}

export default PageTitle;
