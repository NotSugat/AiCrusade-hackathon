import React from "react";
import Navbar from "../components/Navbar";
import { Input } from "@/components/ui/input";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";

const Dashboard = () => {
  return (
    <main className="flex">
      <div className="w-[var(--container-width)] bg-secondary ">
        <section>
          <h1>Dashboard</h1>
          <p>Real-time data</p>
          <SearchBar />
        </section>
        <section>
          <Card />
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
