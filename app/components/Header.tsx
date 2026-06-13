"use client";

import Link from "next/link";

export const Header = () => {
    return (
        <header>
            <nav className="w-full bg-darkgreen h-22">
                <ul className="flex items-center justify-center h-full gap-12 text-yellow font-bold">
                    <li>
                        <Link href={"/"}>Hem</Link>
                    </li>
                    <li>
                        <Link href={"/animals"}>Djuren</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};