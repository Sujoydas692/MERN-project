const {v4 : uuidv4} = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCroodsForAddress = require('../util/location');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
        location: {
            lat: 40.7484445,
            lng: -73.9878584
        },
        address: 'Skyscraper in New York City, New York',
        creator: 'u1'
    }
];

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });

    if(!place){
        throw new HttpError('Could not find place for the provided id!', 404);
    }
    
    res.json({place});
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });

    if(!places || places.length === 0){
        return next(new HttpError('Could not find places for the provided user id!', 404));
    }

    res.json({places});
}

const createPlace = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs!', 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCroodsForAddress(address);
    } catch (error) {
        return next(error)
    }

    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator

    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({places: createdPlace});
};

const updatePlace = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs!', 422);
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if(DUMMY_PLACES.find(p => p.id === placeId)){
        throw new HttpError('Could not find place for that id!', 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

    res.status(200).json({message: 'Place deleted successfully!'});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;