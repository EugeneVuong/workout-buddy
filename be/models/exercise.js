const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  muscle: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

exerciseSchema.set("toJSON", {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString();
    delete returnedDocument._id;
    delete returnedDocument.__v;
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
