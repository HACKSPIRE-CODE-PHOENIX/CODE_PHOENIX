import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full h-screen ">
      <div className="button border-2 border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link href="/connect">
            Get started
          </Link>
        </div>
    </div>
  );
}
