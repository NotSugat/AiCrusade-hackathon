"use client"
import React from "react";
import Map from "../components/Map/index";
import SearchBar from "../components/SearchBar";

const MapPage = () => {
  return <div className="h-[100vh] overflow-y-hidden  w-[var(--container-width)]">
    <SearchBar formStyle="rounded-none " />
    <Map />
  </div>;
};

export default MapPage;
