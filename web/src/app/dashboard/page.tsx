"use client"
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Input } from "@/components/ui/input";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiMoreHorizontal } from "react-icons/fi";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImStatsDots } from "react-icons/im"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/auth/auth";
import SignIn from "../signin/page";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase/config";
import { v4 as uuid } from "uuid"
import Map from "../components/Map/map";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [speciesCount, setSpeciesCount] = useState(0)
  const [birds, setBirds] = useState([])
  const [birdTypes, setBirdTypes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const birdRef = ref(database, `userdata/${user?.uid}`);
    const birdSpecRef = ref(database, "birdspecs");
    onValue(birdSpecRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newData = Object.entries(data).map(([key, value]) => value);
        setBirdTypes(newData);
        console.log(newData)
      }
    });
    onValue(birdRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newData = Object.entries(data).map(([key, value]) => value);
        const newerData = newData.map((value) => Object.entries(value).map(([key, value]) => value))

        let flattenData: any = [];
        newerData.forEach((item) => item.forEach((item) => flattenData.push(item)))



        setBirds(flattenData)
        console.log(flattenData.length);
      }

    });

  }, [user])

  if (!user && !loading) {
    return <SignIn />;
  }

  return (
    <main className="flex">
      <Navbar />

      <div className=" w-[var(--container-width)] bg-secondary overflow-y-hidden overflow-x-hidden">

        <nav className="flex items-center bg-white   justify-between h-[4rem] px-4">
          <p>Dashboard</p>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt="Avatar" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <p>Pranish</p>
          </div>
        </nav>


        <section className="mx-2 bg-green-300 px-4 h-[var(--card-height)] flex items-center relative my-12" >
          <div>

            <p className="text-3xl font-semibold">Hello, Pranish</p>
            <p className="text-xl font-medium">Do track brid and save brid</p>
          </div>

          <Image src="/assets/danfe.png" alt="danfe img" height={1000} width={1000} className="object-contain h-[var(--danfe-height)] absolute right-[-20%]  " />

        </section>

        <section className="mx-4">
          <p className="text-xl ">Overview</p>
          <div className="grid grid-cols-4 gap-4">

            <div className="rounded-sm shadow-sm flex items-center  gap-4 bg-[var(--small-card-bg)] p-4 ">
              <div className="p-4 bg-gray-200 bg-opacity-30">
                <ImStatsDots className="text-2xl text-white" />
              </div>

              <div className=" w-full grid place-items-center">
                <p className="text-2xl font-semibold text-secondary">4</p>
                <p className="text-xl font- text-secondary "> Bird per day</p>
              </div>
            </div>

            <div className="rounded-sm shadow-sm flex items-center  gap-4 bg-[var(--small-card-bg)] p-4 ">
              <div className="p-4 bg-gray-200 bg-opacity-30">
                <ImStatsDots className="text-2xl text-white" />
              </div>

              <div className=" w-full grid place-items-center">
                <p className="text-2xl font-semibold text-secondary">2</p>
                <p className="text-xl font- text-secondary ">Bird species </p>
              </div>
            </div>

            <div className="rounded-sm shadow-sm flex items-center  gap-4 bg-[var(--small-card-bg)] p-4 ">
              <div className="p-4 bg-gray-200 bg-opacity-30">
                <ImStatsDots className="text-2xl text-white" />
              </div>

              <div className=" w-full grid place-items-center">
                <p className="text-2xl font-semibold text-secondary">10</p>
                <p className="text-xl font- text-secondary ">Endagered Bird</p>
              </div>
            </div>

            <div className="rounded-sm shadow-sm flex items-center  gap-4 bg-[var(--small-card-bg)] p-4 ">
              <div className="p-4 bg-gray-200 bg-opacity-30">
                <ImStatsDots className="text-2xl text-white" />
              </div>

              <div className=" w-full grid place-items-center">
                <p className="text-2xl font-semibold text-secondary">10</p>
                <p className="text-xl font- text-secondary ">Bird Count</p>
              </div>
            </div>


          </div>

        </section>


        <section className="mx-4 mt-4 grid grid-cols-2 gap-4">
          <div>
            <p>Your Bird</p>
            <ScrollArea className="h-[var(--bottom-card-height)] ">
              <div className="space-y-2">

                {
                  birds.map((bird) => (
                    <div key={uuid()} className="px-4 py-2 bg-gray-200 rounded-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-full">
                          <Image src="/assets/chestnut.png" alt="profile pic" height={1000} width={1000} className="h-12 w-12" />
                        </div>
                        <div>

                          <p className="text-xl font-medium">{bird.birdname}</p>
                          <p className="text-sm">{bird.city}</p>
                        </div>
                      </div>
                      <p>{bird.Date}</p>
                    </div>
                  ))
                }



              </div>


            </ScrollArea>


          </div>
          <div className="bg-green-200 overflow-hidden">
            <p className="text-xl font-semibold text-center p-2 ">

              Find in Map
            </p>
            <div className="h-[100px]">

              <Map searchValue="" className="h-[350px]" />

              <Button onClick={router}>Find in Map</Button>
            </div>
          </div>
        </section>
      </div>
    </main >
  );
};

export default Dashboard;
