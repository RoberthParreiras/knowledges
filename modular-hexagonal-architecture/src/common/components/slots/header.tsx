import Link from "next/link";

export default function Header() {
  return (
    <div>
      <nav>
        <Link href={"/products"}>Products</Link>
      </nav>
    </div>
  );
}
