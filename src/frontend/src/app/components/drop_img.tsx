import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface Drop_Props {
    onUploadComplete: (file: File) => void;
}

export default function Drop_Img({ onUploadComplete }: Drop_Props) {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);

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

        const selectedFile = e.dataTransfer.files[0];
        handleFileChange(selectedFile)
    }, []);

    const handleClick = () => {
        hiddenFileInput.current?.click();
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileChange(e.target.files[0]);
        }
    };

    const handleFileChange = (selectedFile: File) => {
        setFile(selectedFile);
        onUploadComplete(selectedFile);
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
                {file ? (
                    <Image
                        src={URL.createObjectURL(file)}
                        alt="Uploaded Image"
                        width={350}
                        height={350}
                    />
                ) : (
                    <div>
                        <Image src="/upload_cloud.svg" alt="Upload" width={60} height={60} />
                        <p>drag and drop your image here!</p>
                    </div>    
                )}
            
                <input type="file" onChange={handleInputChange} style={{ display: 'none' }} ref={hiddenFileInput}></input>
            </div>
        </object>
    );
}