'use client'
import "./globals.css";
import { useState } from "react";
import Urltab from "./components/url_tab";
import Imgtab from "./components/img_tab";

export default function Home() {
  const [showUrl, setShowUrl] = useState(true);

  return (
    <div className="bg-cream w-4/5 flex flex-col justify-center items-center">
      <h1 className="text-[48px]">calicopy image search</h1>
      <Imgtab />
    </div>
  );
}
