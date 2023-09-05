"use client"
import React, { useEffect, useState } from "react";
import Map from "../components/Map/index";
import SearchBar from "../components/SearchBar";
import { database } from "../firebase/config";
import { onValue, ref } from "firebase/database";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/auth/auth";
import SignIn from "../signin/page";

const MapPage = () => {
  const [user, loading] = useAuthState(auth);
  const [searchValue, setSearchValue] = useState("")
  if (!user && !loading) {
    return <SignIn />;
  }



  return <div className="flex">
    <Navbar />
    <div className="h-[100vh] overflow-y-hidden  w-[var(--container-width)]">
      <SearchBar setSearchValue={setSearchValue} formStyle="rounded-none" />

      <Map searchValue={searchValue} />
    </div>
  </div>
};

export default MapPage;
