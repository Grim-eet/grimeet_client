import Image from "next/image";
import { Input } from "./components/common/Input";
import { HomeBtn } from "./components/common/HomeBtn";

export default function Home() {
  return (
    <main>
      <Input inputName={"email"} />
      <Input inputName={"password"} />
      <HomeBtn />
    </main>
  );
}
