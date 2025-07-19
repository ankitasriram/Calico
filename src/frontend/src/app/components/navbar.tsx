'use client'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {

    const pathname = usePathname();
    const navItems = [
        { path: "/", label: "Home", icon: "home"},
        { path: "/about", label: "About", icon: "file"},
        { path: "/account", label: "My Account", icon: "account"}
    ];
    const renderNavItems = ({path, label, icon}: typeof navItems[number]) => {

        const imageSrc = `/${icon}-${pathname === path ? "light" : "dark"}.svg`;

        return (

            <Link key={path} href={path} className={`flex text-3xl p-3
                ${pathname === path ? "bg-black rounded-xl text-white" : ""}`}
            >
                <Image 
                src={imageSrc}
                alt={label}
                width={30}
                height={30}
                /> 
                <p className="ml-3">{label}</p>
            </Link>
        );
    };

    return (
        <div className="relative w-1/5 h-full shadow-lg/100 flex flex-col px-5">

            <div className="flex mt-5 mb-10 text-5xl tracking-wide"> 
                <Image 
                src="/logo.svg"
                alt="Logo"
                width={70}
                height={70}
                /> 

                calicopy
                
            </div>

            {navItems.map(renderNavItems)}

            <Image src="/tab.svg" alt="Calico background" layout="fill" objectFit="cover" style={{ zIndex: -1 }}/>
        </div>

    );
}