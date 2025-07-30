'use client'
import Imgtab from "./components/img_tab";

export default function Home() {

  return (
    <div className="bg-cream fixed top-0 right-0 w-4/5 h-full flex flex-col justify-center items-center overflow-scroll">
      <h1 className="text-[48px]">calicopy image search</h1>
      <Imgtab />
    </div>
  );
}
