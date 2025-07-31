import Image from "next/image";
import ListingArea from "../components/listing_area";
import Link from "next/link";

export default function Account() {
    return(
        <div className="bg-cream fixed top-0 right-0 w-4/5 h-full flex flex-col items-center overflow-scroll p-[7vw]">
            
            <div className="flex justify-left w-full mb-[3vw]">
                <Image src="/profile.svg" alt="Profile" width={200} height={200}></Image>

                <div className="px-[2vw] flex flex-col justify-start">
                    <p className="text-[2.5vw]">username</p>
                    <p>[] listings</p>
                    {/* <div className="flex items-center mt-[0.5vw] gap-[0.5vw]">
                        <Image src="/add_orange.svg" alt="Follow" width={50} height={50}></Image>
                        <p className="text-dark-orange">follow</p>
                    </div> */}
                </div>

                <div className="ml-auto flex flex-col items-end">
                    <Image src="/settings.svg" alt="Settings" width={60} height={60}></Image>
                    <Link href="/account/new_listing" className="bg-custom-brown text-white flex items-center rounded-[1vw] p-[1vw] mt-auto">
                        <Image src="/add_white.svg" alt="Add" width={50} height={50}></Image>
                        new listing
                    </Link>
                </div>
            </div>

            <ListingArea />
            
        </div>
    );
}