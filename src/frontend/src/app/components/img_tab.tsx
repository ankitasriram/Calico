'use client'
import { useState } from "react";
import ListingArea from "./listing_area";

export default function Imgtab() {
    const [results, setResults] = useState(false)

    return (
        <div className="w-4/5 h-2/3 flex flex-col items-center pb-10">
            drag and drop the clothing you want to search for!

            <div
                className="bg-white w-2/3 py-20 border-4 border-dark-orange border-dotted rounded-xl m-10 flex flex-col justify-center items-center text-dark-orange"
            >
                <img src="/upload_cloud.svg" />
                drag & drop your image
            </div>

            <button
                onClick={() => setResults(true)}
                className="flex hover:bg-custom-brown hover:cursor-pointer bg-light-orange rounded-2xl border-4 border-dark-orange text-white py-2 px-15"
            >
                <img src="/search.svg" className="mr-2" />
                search
            </button>

            {results && (
                <ListingArea />
            )}
        </div>
    );
}