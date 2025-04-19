import Link from "next/link";

export default function AppHeader() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/gallery">Gallery</Link></li>
                </ul>
            </nav>
        </header>
    )
}