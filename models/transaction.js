"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      startDate: DataTypes.DATEONLY,
      dueDate: DataTypes.DATEONLY,
      accountNumber: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {}
  );
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
    });
  };
  return Transaction;
};
