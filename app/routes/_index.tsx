import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import Button from "./components/button.component";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen w-full bg-[#F8F8F8] justify-center items-center">
      <div className="flex flex-col justify-center items-center w-1/2 h-1/2 bg-white rounded-2xl">
        <h1 className="font-bold text-5xl text-[#333]">Comece Sua Aventura!</h1>
        <Button buttonClass="mt-8 h-1/5 flex bg-[#7357FF] rounded-xl w-[11.563rem] font-semibold text-white justify-center items-center hover:bg-[#674ee5]" text="Clique Aqui!" func={() => navigate("/explore/trail-1")}></Button>
      </div>
    </div>
  );
}
