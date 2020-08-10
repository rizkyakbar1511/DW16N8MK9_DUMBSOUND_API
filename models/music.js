"use strict";
module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define(
    "Music",
    {
      artistId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      year: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      musicLink: DataTypes.STRING,
    },
    {}
  );
  Music.associate = function (models) {
    // associations can be defined here
    Music.belongsTo(models.Artist, {
      foreignKey: {
        name: "artistId",
      },
    });
  };
  return Music;
};
