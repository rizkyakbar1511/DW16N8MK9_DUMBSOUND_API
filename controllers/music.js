const { Music, Artist } = require("../models");
const Joi = require("@hapi/joi");

exports.readMusic = async (req, res) => {
  try {
    const music = await Music.findAll({
      include: {
        model: Artist,
        attributes: {
          exclude: ["artistId", "ArtistId", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["artistId", "ArtistId", "createdAt", "updatedAt"],
      },
    });
    return res.status(200).send({ status: "Success", Music: music });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.createMusic = async (req, res) => {
  try {
    const schema = Joi.object({
      artistId: Joi.string(),
      title: Joi.string().min(3).required(),
      year: Joi.string().required(),
      thumbnail: Joi.string().required(),
      musicLink: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    const music = await Music.create(req.body);
    const musicCreated = await Music.findOne({
      where: {
        id: music.id,
      },
      include: {
        model: Artist,
        attributes: {
          exclude: ["artistId", "artistId", "createdAt", "updatedAt"],
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return res.status(200).send({ status: "Success", data: musicCreated });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.editMusic = async (req, res) => {
  try {
    const { id } = req.params;
    await Music.update(req.body, { where: { id } });
    const musicUpdated = await Music.findOne({
      where: { id },
      include: {
        model: Artist,
        attributes: {
          exclude: ["artistId", "ArtistId", "createdAt", "updatedAt"],
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!musicUpdated)
      return res
        .status(400)
        .send({ error: { message: `Music with id : ${id} not found` } });
    return res
      .status(200)
      .send({ status: { message: "Success", data: musicUpdated } });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deleteMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const music = await Music.destroy({ where: { id } });
    if (!music)
      return res
        .status(400)
        .send({ error: { message: `Music with id : ${id} not found` } });
    return res.status(200).send({ message: `Music with id : ${id} deleted` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
