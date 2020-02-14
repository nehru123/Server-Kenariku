const express = require("express");
const router = express.Router();

const Gallery = require("../../models/Gallery");

// get
router.get("/getG", (req, res) => {
  Gallery.find().then(gallery => {
    return res.status(200).json(gallery);
  });
});
router.post("/add", (req, res) => {
  const newGallery = new Gallery({
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    foto: req.body.foto
  });
  newGallery.save().then(galleries => res.json(galleries));
});
router.delete("/delete/:id", (req, res) => {
  Gallery.findById(req.params.id)
    .then(gallery => gallery.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});
router.get("/find/:id", (req, res) => {
  Report.findById(req.params.id)
    .then(hasil => {
      if (hasil) {
        res.status(200).json(hasil);
      } else {
        res.status(200).json({
          message: "Pencarian Sukses"
        });
      }
    })
    .catch(err =>
      res.status(400).json({
        message: "Not Found!"
      })
    );
});

module.exports = router;
