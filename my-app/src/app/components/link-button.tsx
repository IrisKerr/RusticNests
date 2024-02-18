"use client";
import { Button } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  path: string;
}

function LinkButton({ title, path }: Props) {
  const router = useRouter();
  return (
    <Button type="default" onClick={() => router.push(path)}>
      {title}
    </Button>
  );
}

export default LinkButton;
