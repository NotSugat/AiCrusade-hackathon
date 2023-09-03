"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SearchBar from "../SearchBar";
import L from "leaflet";
import { database } from "@/app/firebase/config";
import { onValue, ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/auth/auth";

const Map = ({ searchValue }: { searchValue: string }) => {

  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);




  const icon = (path: string) => {
    return new L.Icon({
      iconUrl: path,

      iconSize: [64, 64],
    });

  }

  const [birds, setBirds] = useState<any>([]);
  const [displayBirds, setDisplayBirds] = useState([]);
  const [birdTypes, setBirdTypes] = useState([]);


  useEffect(() => {

    const birdSpecRef = ref(database, "birdspecs");
    const birdDbRef = ref(database, `userdata/${user?.uid}`);
    onValue(birdSpecRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newData = Object.entries(data).map(([key, value]) => value);
        setBirdTypes(newData);
      }
    });
    onValue(birdDbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newData = Object.entries(data).map(([key, value]) => value)
        const newItems = newData.map((item) => Object.entries(item).map(([key, value]) => value))

        setBirds(newItems);

      }
    });

  }, [user]);

  useEffect(() => {
    if (birds.length > 0) {

      birds.map((item) => item.map((data) => console.log(data)))

    }
    // console.log(birds)

  }, [birds])


  // useEffect(() => {
  //   const allBirds = birds.map((value) => value).filter((value) => value.birdname.toLowerCase().includes(searchValue.toLowerCase()));
  //   const newBirds = allBirds.map((bird) => {
  //     const birdspec = birdTypes.find(type => type.name === bird.name);
  //     return { ...bird, icon: birdspec.image }
  //   })
  //
  //   setDisplayBirds(newBirds)
  //
  //
  // }, [searchValue, birds]);

  if (!user && !loading) {
    return <div>Loading...</div>;
  }
  return (
    <MapContainer
      center={[27.6158, 85.5675]}
      zoom={15}
      scrollWheelZoom={true}
      className="h-[calc(100vh-2.5rem)] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {birds.map((value: any) => (
        <Marker key={value.birdname} position={[value.latitude, value.longitude]} icon={icon(value.icon)}>
          <Popup>{value.birdname}</Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export default Map;
