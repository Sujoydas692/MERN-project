import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import './PlaceForm.css';

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

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

   const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        if(identifiedPlace){
            setFormData(
                {
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true);
        }
        setIsLoading(false);
    }, [setFormData, identifiedPlace]);

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if(!identifiedPlace){
        return (
            <div className="center">
                <Card>
                <h2>Could not find place!</h2>
                </Card>
            </div>
                );
    }

    if(isLoading){
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
                );
    }

    return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please ener a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
        />

       <Input id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
    </form>
    );
};

export default UpdatePlace;