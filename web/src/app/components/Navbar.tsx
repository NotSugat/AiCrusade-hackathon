"use client";
import Link from "next/link";
import UserInfo from "./UserInfo";
import { MdDashboard } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";
import { FiMap } from "react-icons/fi";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();
  console.log(path);

  return (
    <aside className="flex h-[100dvh]  w-[var(--sidebar-width)] flex-col items-center justify-between bg-primary">
      <nav className="w-[var(--sidebar-component-width)]">
        <p className="mt-8 px-2 text-3xl font-bold tracking-widest text-[var(--text-primary)]">{`Bird's Eye`}</p>
        <ul className="mt-12  space-y-4 ">
          <li>
            <Link
              href="/dashboard"
              className={` relative flex items-center gap-2 p-2 text-2xl font-semibold text-[--text-primary] ${path === "/dashboard" ? "active" : ""
                }`}
            >
              <MdDashboard />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/stats"
              className={` relative flex items-center gap-2 p-2 text-2xl font-semibold text-[--text-primary] ${path === "/stats" ? "active" : ""
                }`}
            >
              <ImStatsDots />
              Statistics
            </Link>
          </li>

          <li>
            <a
              href="/map"
              className={` relative flex items-center gap-2 p-2 text-2xl font-semibold text-[--text-primary] ${path === "/map" ? "active" : ""
                }`}
            >
              <FiMap />
              Find Bird
              {}
            </a>
          </li>
        </ul>
      </nav>
      <UserInfo
        className="mb-8 w-[var(--sidebar-component-width)] cursor-pointer rounded-full p-4 transition-all duration-300 ease-in-out hover:bg-gray-600 hover:bg-opacity-60 "
        profilePic="https://pbs.twimg.com/profile_images/1696589238303956992/CMhCqaa4_400x400.jpg"
        name="Isabella arch"
        username="her"
      />
    </aside>
  );
};

export default Navbar;
