"use client"
import React from "react";
import LineChart from "../components/lineChart";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/auth/auth";
import SignIn from "../signin/page";


const Stats = () => {

  const [user, loading] = useAuthState(auth);
  if (!user && !loading) {
    return <SignIn />;
  }
  return <div className="flex">

    <Navbar />
    <div className="w-[var(--container-width)]">
      <SearchBar formStyle="flex w-full" />

      <LineChart />
    </div>;
  </div>
};

export default Stats;
