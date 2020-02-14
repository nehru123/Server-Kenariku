const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  judul: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    default: true
  },
  Foto: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Gallery = mongoose.model("gallery", GallerySchema);
