"use client";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../firebase/auth/auth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/dashboard");
  };

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        return router.push("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;

        console.log(errorMessage);
      });
  };

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center  bg-gray-200">
      <div className=" rounded-md bg-black p-4 shadow-md">
        <h1 className="select-none text-center text-2xl font-bold text-gray-200">
          Sign In
        </h1>
        <form onSubmit={handleForm} className="flex flex-col gap-2">
          <label htmlFor="email">
            <p className="text-sm text-gray-200">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full rounded-sm bg-slate-300 p-1"
            />
          </label>
          <label htmlFor="password">
            <p className="text-sm text-gray-200">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full rounded-sm bg-slate-300 p-1"
            />
          </label>
          <button
            type="submit"
            className="mt-2 rounded-sm border py-2 text-sm text-gray-300 transition-all duration-150 ease-in-out hover:border-white"
          >
            Login
          </button>
        </form>
        <p className="p-2 text-center text-sm font-medium text-gray-200">OR</p>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-4 rounded-full border-2 border-gray-300 px-4 py-2 transition-all duration-150 ease-in-out hover:border-white"
        >
          <FcGoogle size={24} />
          <h2 className="text-xl font-medium text-gray-200">
            Continue with Google
          </h2>
        </button>

        <Link
          href="/signup"
          className="mt-2 flex cursor-pointer items-center justify-center  text-center text-sm text-gray-200 transition-all duration-150 ease-in-out hover:text-white"
        >
          Want to track Bird? SignUp
        </Link>
      </div>
    </div>
  );
}

export default SignIn;

