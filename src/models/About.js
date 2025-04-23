const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const About = sequelize.define("About", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nicknames: {
    type: DataTypes.TEXT, // Store as JSON stringified text
    get() {
      const value = this.getDataValue("nicknames");
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue("nicknames", JSON.stringify(value));
    },
  },
  socialMediaLinks: {
    type: DataTypes.TEXT, // Store as JSON stringified text
    get() {
      const value = this.getDataValue("socialMediaLinks");
      return value ? JSON.parse(value) : {};
    },
    set(value) {
      this.setDataValue("socialMediaLinks", JSON.stringify(value));
    },
  },
  bio: {
    type: DataTypes.TEXT,
  },
  mainProfession: {
    type: DataTypes.STRING,
  },
  birthday: {
    type: DataTypes.DATE,
  },
  website: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  degree: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = About;
