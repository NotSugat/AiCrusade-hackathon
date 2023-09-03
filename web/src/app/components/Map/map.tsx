"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SearchBar from "../SearchBar";
import L from "leaflet";
import { database } from "@/app/firebase/config";
import { onValue, ref } from "firebase/database";

const Map = ({ searchValue }: { searchValue: string }) => {



  const icon = (path: string) => {
    return new L.Icon({
      iconUrl: path,

      iconSize: [64, 64],
    });

  }



  const [birds, setBirds] = useState<any>({});
  const [displayBirds, setDisplayBirds] = useState([]);
  const [birdTypes, setBirdTypes] = useState([]);


  useEffect(() => {

    const birdSpecRef = ref(database, "birdspecs");
    const birdDbRef = ref(database, "bird");
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
        setBirds(data);
      }
    });

  }, []);



  useEffect(() => {
    const allBirds = Object.entries(birds).map(([key, value]) => value).filter((value) => value.name.toLowerCase().includes(searchValue.toLowerCase()));
    const newBirds = allBirds.map((bird) => {
      const birdspec = birdTypes.find(type => type.name === bird.name);
      return { ...bird, icon: birdspec.image }
    })

    setDisplayBirds(newBirds)

  }, [searchValue, birds]);


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

      {displayBirds.map((value: any) => (

        <Marker key={value.name} position={[value.latitude, value.longitude]} icon={icon(value.icon)}>
          <Popup>{value.name}</Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export default Map;
