'use client'
import Drop_Img from "./components/drop_img";
import ListingArea from "./components/listing_area";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState(false);

  return (
    <div className="bg-cream fixed top-0 right-0 w-4/5 h-full flex flex-col justify-center items-center overflow-scroll">

      <h1 className="text-[2.5vw]">calicopy image search</h1>
      <div className="w-2/3 h-2/3 flex flex-col items-center pb-10">
          drag and drop the clothing you want to search for!

          <div className="w-full my-[2vw]">
            <Drop_Img />
          </div>

          <button
              onClick={() => setResults(true)}
              className="flex hover:bg-custom-brown hover:cursor-pointer bg-light-orange rounded-2xl border-4 border-dark-orange text-white mb-[2vw] py-2 px-15"
          >
              <Image src="/search.svg" alt="Search" width={40} height={40} className="mr-2" />
              search
          </button>

          {results && (
              <ListingArea />
          )}
      </div>
    </div>
  );
}
