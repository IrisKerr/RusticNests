import { Button, Input } from "antd";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 h-screen">
        <h1>RusticNests</h1>
        <Button type="primary">Primary Button</Button>
        <Button>default Button</Button>

        <Input placeholder="basic usage" className="w-40"></Input>
      </div>
    </>
  );
}
