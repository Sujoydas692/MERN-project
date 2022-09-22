import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
    {
    id: 'p1',
    title: 'Tajmahal',
    description: 'The Taj Mahal was commissioned by Shah Jahan in 1631, to be built in the memory of his wife Mumtaz Mahal, who died on 17 June that year, while giving birth to their 14th child, Gauhara Begum. Construction started in 1632, and the mausoleum was completed in 1648, while the surrounding buildings and garden were finished five years later. The imperial court documenting Shah Jahan grief after the death of Mumtaz Mahal illustrates the love story held as the inspiration for the Taj Mahal.',
    imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPwhBCkvBIY5NfEeighvYIBiMeGudV01thRrL4Y=w408-h265-k-no',
    address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
    location: {
        lat: 27.1751496,
        lng: 78.0399535,
    },
    creator: 'u1'
},
{
    id: 'p2',
    title: 'Tajmahal',
    description: 'The Taj Mahal was commissioned by Shah Jahan in 1631, to be built in the memory of his wife Mumtaz Mahal, who died on 17 June that year, while giving birth to their 14th child, Gauhara Begum. Construction started in 1632, and the mausoleum was completed in 1648, while the surrounding buildings and garden were finished five years later. The imperial court documenting Shah Jahan grief after the death of Mumtaz Mahal illustrates the love story held as the inspiration for the Taj Mahal.',
    imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPwhBCkvBIY5NfEeighvYIBiMeGudV01thRrL4Y=w408-h265-k-no',
    address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
    location: {
        lat: 27.1751496,
        lng: 78.0399535,
    },
    creator: 'u2'
}
];

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;