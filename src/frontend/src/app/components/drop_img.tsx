import Image from "next/image";

export default function Drop_Img() {

    return (
        <div
            className="bg-white size-full py-[8vw] border-[0.3vw] border-dark-orange border-dotted rounded-[1vw] flex flex-col justify-center items-center text-dark-orange"
        >
            <Image src="/upload_cloud.svg" alt="Upload" width={60} height={60}/>
            drag & drop your image
        </div>
    );
}