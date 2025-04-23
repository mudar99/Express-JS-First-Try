const About = require("../models/About");

const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.error("About information not found", null, 404);
    }
    res.success("About information retrieved successfully", about, 200);
  } catch (error) {
    next(error);
  }
};

const updateAbout = async (req, res, next) => {
  const {
    name,
    nicknames,
    socialMediaLinks,
    bio,
    mainProfession,
    birthday,
    website,
    phone,
    city,
    age,
    degree,
    email,
  } = req.body;

  // Retrieve file path if an image was uploaded
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    let about = await About.findOne();

    // If no record exists, create a new one
    if (!about) {
      about = await About.create({
        name,
        nicknames: nicknames ? JSON.parse(nicknames) : [],
        socialMediaLinks: socialMediaLinks ? JSON.parse(socialMediaLinks) : {},
        bio,
        mainProfession,
        birthday,
        website,
        phone,
        city,
        age,
        degree,
        email,
        image,
      });
    } else {
      // If record exists, update it
      about.name = name;
      about.nicknames = nicknames;
      about.socialMediaLinks = socialMediaLinks;
      about.bio = bio;
      about.mainProfession = mainProfession;
      about.birthday = birthday;
      about.website = website;
      about.phone = phone;
      about.city = city;
      about.age = age;
      about.degree = degree;
      about.email = email;
      if (image) {
        about.image = image;
      }
      await about.save();
    }

    res.success("About information updated successfully", about, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAbout,
  updateAbout,
};
