"use client"
import React from "react";
import LineChart from "../components/lineChart";
import SearchBar from "../components/SearchBar";

const Stats = () => {
  return <div className="w-[var(--container-width)]">
    <SearchBar formStyle="flex w-full" />

    <LineChart />
  </div>;
};

export default Stats;
