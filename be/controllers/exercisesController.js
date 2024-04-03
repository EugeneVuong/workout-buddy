const Exercise = require("../models/exercise");
const User = require("../models/user");

const getAllExercises = async (request, response, next) => {
  try {
    const userID = request.user;
    const foundExercises = await Exercise.find({ user: userID });
    return response.status(201).json(foundExercises);
  } catch (error) {
    next(error);
  }
};

const getExercise = async (request, response, next) => {
  try {
    const id = request.params.id;
    console.log(id);
    const userID = request.user;
    const foundExercise = await Exercise.findOne({ user: userID, _id: id });
    return response.status(201).json(foundExercise);
  } catch (error) {
    next(error);
  }
};

const createExercise = async (request, response, next) => {
  try {
    const userID = request.user;
    const { name, type, muscle, equipment, difficulty, instructions, sets } =
      request.body;
    const foundUser = await User.findById(userID);
    const createdExercise = new Exercise({
      name,
      type,
      muscle,
      equipment,
      type,
      difficulty,
      instructions,
      sets,
      user: foundUser._id,
    });
    console.log(createdExercise);

    const savedExercise = await createdExercise.save();
    console.log("test");

    foundUser.exercises.push(savedExercise);
    await foundUser.save();

    return response.status(201).json(savedExercise);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllExercises,
  getExercise,
  createExercise,
};
