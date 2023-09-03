import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SearchBar from '../SearchBar';
import L from 'leaflet';

const houseSparrowIcon = new L.Icon({
	iconUrl: '/assets/house_sparrow.png', // Replace with the path to your custom icon image

	iconSize: [64, 64], // Adjust the size of the icon
});

const chestIcon = new L.Icon({
	iconUrl: '/assets/chestnut.png', // Replace with the path to your custom icon image

	iconSize: [64, 64], // Adjust the size of the icon
});
const whiteBrestedIcon = new L.Icon({
	iconUrl: '/assets/white_brested.png', // Replace with the path to your custom icon image

	iconSize: [64, 64], // Adjust the size of the icon
});
const azzaraIcon = new L.Icon({
	iconUrl: '/assets/azzara.png', // Replace with the path to your custom icon image

	iconSize: [64, 64], // Adjust the size of the icon
});
const redCrossbillIcon = new L.Icon({
	iconUrl: '/assets/red_crossbill.png', // Replace with the path to your custom icon image

	iconSize: [64, 64], // Adjust the size of the icon
});

const map = () => {
	return (

		<MapContainer center={[27.6158, 85.5675]} zoom={15} scrollWheelZoom={true} className='h-[100vh] w-full'>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[27.6158, 85.5675]} icon={redCrossbillIcon}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	)
}

export default map

