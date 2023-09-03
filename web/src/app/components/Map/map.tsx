"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SearchBar from "../SearchBar";
import L from "leaflet";
import { database } from "@/app/firebase/config";
import { onValue, ref } from "firebase/database";

const Map = ({ searchValue }: { searchValue: string }) => {
  const houseSparrowIcon = new L.Icon({
    iconUrl: "/assets/house_sparrow.png", // Replace with the path to your custom icon image

    iconSize: [64, 64], // Adjust the size of the icon
  });

  const chestIcon = new L.Icon({
    iconUrl: "/assets/chestnut.png", // Replace with the path to your custom icon image

    iconSize: [64, 64], // Adjust the size of the icon
  });
  const whiteBrestedIcon = new L.Icon({
    iconUrl: "/assets/white_brested.png", // Replace with the path to your custom icon image

    iconSize: [64, 64], // Adjust the size of the icon
  });
  const azzaraIcon = new L.Icon({
    iconUrl: "/assets/azzara.png", // Replace with the path to your custom icon image

    iconSize: [64, 64], // Adjust the size of the icon
  });
  const redCrossbillIcon = new L.Icon({
    iconUrl: "/assets/red_crossbill.png", // Replace with the path to your custom icon image

    iconSize: [64, 64], // Adjust the size of the icon
  });

  const [birds, setBirds] = useState<any>({});
  const [displayBirds, setDisplayBirds] = useState([]);


  useEffect(() => {
    const birdDbRef = ref(database, "bird");
    onValue(birdDbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setBirds(data);
      }
    });
  }, []);

  useEffect(() => {
    const allBirds = Object.entries(birds).map(([key, value]) => value).filter((value) => value.name.toLowerCase().includes(searchValue.toLowerCase()));
    setDisplayBirds(allBirds)

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

        <Marker key={value.name} position={[value.latitude, value.longitude]} icon={redCrossbillIcon}>
          <Popup>{value.name}</Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export default Map;
