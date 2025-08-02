import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export default function Drop_Img(onUploadComplete: (files: File[]) => void) {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            onUploadComplete(files);
        }
    }, [onUploadComplete]);

    const handleClick = () => {
        hiddenFileInput.current?.click();
    }

    const handleFileChange = (event: any) => {
        const files = event.target.files;
    };

    return (
        <object
            className={`cursor-pointer dropzone ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <div
                className="bg-white size-full py-[8vw] border-[0.3vw] border-dark-orange border-dotted rounded-[1vw] flex flex-col justify-center items-center text-dark-orange"
            >
                <Image src="/upload_cloud.svg" alt="Upload" width={60} height={60} />
                drag & drop or click anywhere to upload image
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={hiddenFileInput}></input>
            </div>
        </object>
    );
}