import Script from "next/script";
import Navbar from "./components/Navbar";
import "./globals.scss";
import type { Metadata } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/auth/auth";


export const metadata: Metadata = {
  title: "Bird's Eye",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <Script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        ></Script>
      </head>
      <body className="flex">

        {children}
      </body>
    </html>
  );
}
