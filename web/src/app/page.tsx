"use client"
import { useAuthState } from "react-firebase-hooks/auth";
import Dashboard from "./dashboard/page";
import { auth } from "./firebase/auth/auth";
import SignIn from "./signin/page";

export default function Home() {
  const [user, loading] = useAuthState(auth);


  if (loading)
    return <div className="mt-32 text-center text-2xl">Loading...</div>;


  if (user) {
    return <Dashboard />;
  } else {
    return <SignIn />;
  }

}
