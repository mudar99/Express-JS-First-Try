const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const Skill = sequelize.define("Skill", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  percentage: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      min: 0, // Minimum value of 0
      max: 100, // Maximum value of 100
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Skill;
