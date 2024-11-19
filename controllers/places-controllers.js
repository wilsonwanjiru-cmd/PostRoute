const HttpError = require('../models/http-error');
const Place = require('../models/place');

// GET Place by ID
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError('Something went wrong, could not fetch the place.', 500));
  }

  if (!place) {
    return next(new HttpError('Could not find a place for the provided id.', 404));
  }

  res.json({ place: place.toObject({ getters: true }) });
};

// GET Places by User ID
const getPlaceByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return next(new HttpError('Fetching places failed, please try again later.', 500));
  }

  if (!places || places.length === 0) {
    return next(new HttpError('Could not find places for the provided user id.', 404));
  }

  res.json({ places: places.map(place => place.toObject({ getters: true })) });
};

// POST Create a new place
const createPlace = async (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    creator
  });

  try {
    await createdPlace.save();
  } catch (err) {
    return next(new HttpError('Creating place failed, please try again later.', 500));
  }

  res.status(201).json({ place: createdPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
