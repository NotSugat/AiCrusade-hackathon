"use client"
import React, { useEffect, useState } from "react";
import Map from "../components/Map/index";
import SearchBar from "../components/SearchBar";
import { database } from "../firebase/config";
import { onValue, ref } from "firebase/database";

const MapPage = () => {
  const [searchValue, setSearchValue] = useState("")

  return <div className="h-[100vh] overflow-y-hidden  w-[var(--container-width)]">
    <SearchBar setSearchValue={setSearchValue} formStyle="rounded-none" />
    <Map searchValue={searchValue} />
  </div>;
};

export default MapPage;
