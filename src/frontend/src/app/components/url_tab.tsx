'use client'
import "./globals.css";
import { useState } from "react";

export default function Urltab() {
    const [input, setInput] = useState("");

    return (
        <div className="w-4/5 h-2/3 border-t-4 border-dark-orange flex flex-col items-center p-10">
                input the url to the clothing you want to search for!
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-white font-normal text-lg p-2 mt-5 shadow-md/30 rounded-2xl w-4/5"
                />
                <button 
                    className="flex bg-light-orange rounded-2xl border-4 border-dark-orange text-white py-2 px-15 mt-10"
                >
                    <img src="/search.svg" className="mr-2"/>
                    search
                </button>
        </div>
    );
}