import React from "react";
import Navbar from "../components/Navbar";
import { Input } from "@/components/ui/input";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiMoreHorizontal } from "react-icons/fi";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Dashboard = () => {
  return (
    <main className=" w-[var(--container-width)] bg-secondary ">

      <nav className="flex items-center bg-white   justify-between h-[4rem] px-4">
        <p>Dashboard</p>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <p>Sugat</p>
        </div>
      </nav>


      <section className="bg-green-200 px-4 h-[var(--card-height)] flex items-center relative my-12" >
        <div>

          <p className="text-3xl font-semibold">Hello, Sugat</p>
          <p className="text-xl font-medium">Do track brid and save brid</p>
        </div>

        <Image src="/assets/danfe.png" alt="danfe img" height={1000} width={1000} className="object-contain h-[var(--danfe-height)] absolute right-[-20%]  " />
      </section>


      <section>

      </section>
    </main>
  );
};

export default Dashboard;
