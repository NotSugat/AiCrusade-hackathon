"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SearchBar from "../SearchBar";
import L from "leaflet";
import { database } from "@/app/firebase/config";
import { onValue, ref } from "firebase/database";
import { v4 as uuid } from "uuid"
import { useDispatch } from "react-redux";
import { setCount } from "@/redux/features/count-slice";

const Map = ({ searchValue }: { searchValue: string }) => {



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
    onValue(birdSpecRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newData = Object.entries(data).map(([key, value]) => value);
        setBirdTypes(newData);
      }
    });


    const birdDataRef = ref(database, "userdata");
    onValue(birdDataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newData = Object.entries(data).map(([key, value]) => Object.entries(value).map(([key, value]) => Object.entries(value).map(([key, value]) => value)))

        let flattenData: any = [];
        newData.forEach((item) => item.forEach((item) => item.forEach((item) => flattenData.push(item))))

        setBirds(flattenData);
      }
    });

  }, []);




  useEffect(() => {
    // const allBirds = birds.filter((value) => value.birdname.toLowerCase().includes(searchValue.toLowerCase()));
    // const newBirds = allBirds.map((bird) => {
    //   const birdspec = birdTypes.find(type => type.name === bird.birdname);
    //   return { ...bird, icon: birdspec.image }
    // })
    //
    // setDisplayBirds(newBirds)


    setDisplayBirds(birds.filter((bird: any) => {

      if (bird.birdname)
        return bird.birdname.toLowerCase().includes(searchValue.toLowerCase())

    }).map(bird => {
      const birdspec = birdTypes.find(type => type.name === bird.birdname);
      console.log(birdspec)
      return { ...bird, icon: birdspec.image }
    }))



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

        <Marker key={uuid()} position={[value.latitude, value.longitude]} icon={icon(value.icon)}>
          <Popup>{value.birdname || value.birdname.length !== 0 ? value.birdname : "abc"}</Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export default Map;
