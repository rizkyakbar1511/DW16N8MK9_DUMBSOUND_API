const { Artist, Music } = require("../models");
const Joi = require("@hapi/joi");

exports.readArtists = async (req, res) => {
  try {
    const artist = await Artist.findAll({
      include: {
        model: Music,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["artisId", "ArtisId", "createdAt", "updatedAt"],
      },
    });
    if (!artist)
      return res
        .status(400)
        .send({ error: { message: "Artist lists is empty" } });
    res.status(200).send({ status: { message: "Success", data: artist } });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.readArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findOne({
      where: { id },
      include: {
        model: Music,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["artisId", "ArtisId", "createdAt", "updatedAt"],
      },
    });
    if (!artist)
      return res
        .status(400)
        .send({ error: { message: `Artist with id : ${id} not found` } });
    return res
      .status(200)
      .send({ status: { message: "Success", data: artist } });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.createArtist = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      age: Joi.number().required(),
      type: Joi.string().required(),
      startCareer: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    await Artist.create(req.body);
    const artistCreated = await Artist.findOne({
      where: { name: req.body.name },
      include: {
        model: Music,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["id", "artisId", "ArtisId", "createdAt", "updatedAt"],
      },
    });
    if (!artistCreated)
      return res.status(400).send({
        error: {
          message: `${req.body.name} Failed to save`,
        },
      });
    return res
      .status(200)
      .send({ status: { message: "Success", data: artistCreated } });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.editArtist = async (req, res) => {
  try {
    const { id } = req.params;
    await Artist.update(req.body, { where: { id } });
    const artistUpdated = await Artist.findOne({
      where: { id },
      include: {
        model: Music,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["artisId", "ArtisId", "createdAt", "updatedAt"],
      },
    });
    if (!artistUpdated)
      return res
        .status(400)
        .send({ error: { message: `Artist with id : ${id} not found` } });
    return res
      .status(200)
      .send({ status: { message: "Success", data: artistUpdated } });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.destroy({ where: { id } });
    if (!artist)
      return res
        .status(400)
        .send({ error: { message: `Artist with id : ${id} not found` } });
    return res.status(200).send({ message: `Artist with id : ${id} deleted` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
