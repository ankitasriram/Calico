'use client'
import "./globals.css";

export default function Imgtab() {

    return (
        <div className="w-4/5 h-2/3 border-t-4 border-dark-orange flex flex-col items-center p-10">
            drag and drop the clothing you want to search for!

            <div
                className="bg-white w-2/3 h-full border-4 border-dark-orange border-dotted rounded-xl m-10 flex flex-col justify-center items-center text-dark-orange"
            >
                <img src="/upload_cloud.svg" />
                drag & drop your image
            </div>

            <button 
                className="flex bg-light-orange rounded-2xl border-4 border-dark-orange text-white py-2 px-15"
            >
                <img src="/search.svg" className="mr-2"/>
                search
            </button>
        </div>
    );
}