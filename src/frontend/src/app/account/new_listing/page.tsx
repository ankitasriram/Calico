'use client'
import Drop_Img from "@/app/components/drop_img";
import { useState } from "react";

export default function New_Listing() {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");

    return (

        <div className="bg-cream fixed top-0 right-0 w-4/5 h-full flex flex-col items-center overflow-scroll p-[7vw]">
            <p className="text-[2.5vw] mb-[2vw]">new listing</p>

            <div className="flex size-full">
                <div className="w-2/5">
                    <Drop_Img />
                </div>
                <div className="flex flex-col w-3/5 px-[3vw] justify-center">
                    listing name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white font-normal p-[0.5vw] my-[0.5vw] shadow-md/30 shadow-dark-orange rounded-2xl"
                    />

                    description
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="bg-white h-2/5 font-normal p-[0.5vw] my-[0.5vw] shadow-md/30 shadow-dark-orange rounded-2xl"
                    />

                    price
                    <div> 
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="bg-white font-normal p-[0.5vw] my-[0.5vw] shadow-md/30 shadow-dark-orange rounded-2xl "
                        />

                        <button className="hover:bg-custom-brown hover:cursor-pointer bg-light-orange rounded-2xl border-4 border-dark-orange text-white ml-[2vw] px-[4.5vw]">
                            post
                        </button>

                    </div>

                </div>
            </div>
        </div>

    );

}