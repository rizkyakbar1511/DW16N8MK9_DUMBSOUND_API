const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.auth = (req, res, next) => {
  const header = req.header("Authorization");
  if (!header)
    return res.status(401).send({ error: { message: "Access denied!" } });
  const token = header.replace("Bearer ", "");
  if (!token)
    return res.status(401).send({ error: { message: "Access denied!" } });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ error: { message: "Invalid Token" } });
  }
};

exports.previllegeCheck = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (user.role !== 1)
      return res.status(401).send({
        error: {
          message: "Unauthorized, Access Denied !",
        },
      });
    next();
  } catch (error) {
    res.status(400).send({ error: { message: "Invalid Token" } });
  }
};
