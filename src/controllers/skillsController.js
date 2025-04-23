const Skill = require("../models/Skill");

// POST: Create a new skill
const postSkill = async (req, res, next) => {
  const { title, percentage, description } = req.body;

  try {
    if (!title || !percentage || !description) {
      return res.error("Please fill out all fields!", null, 400); // Bad Request
    }

    const existingSkill = await Skill.findOne({ where: { title } });
    if (existingSkill) {
      return res.error("Skill with this title already exists.", null, 409); // Conflict
    }

    const skill = await Skill.create({ title, percentage, description });
    res.success("Skill created successfully", skill, 201); // Created
  } catch (error) {
    next(error);
  }
};

// GET: Retrieve all skills
const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.findAll();
    res.success("Skills retrieved successfully", skills, 200); // OK
  } catch (error) {
    next(error);
  }
};

// PUT: Update a skill by ID
const putSkill = async (req, res, next) => {
  const { id } = req.params;
  const { title, percentage, description } = req.body;

  try {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      return res.error("Skill not found", null, 404); // Not Found
    }

    skill.title = title;
    skill.percentage = percentage;
    skill.description = description;
    await skill.save();

    res.success("Skill updated successfully", skill, 200); // OK
  } catch (error) {
    next(error);
  }
};

// DELETE: Remove a skill by ID
const deleteSkill = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      return res.error(`Skill with id ${id} not found`, null, 404); // Not Found
    }

    await skill.destroy();
    res.success("Skill deleted successfully", null, 200); // OK
  } catch (error) {
    next(error);
  }
};

// GET: Show Skill
const showSkill = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      return res.error(`Skill with id ${id} not found`, null, 404); // Not Found
    }

    res.success("Skill retrieved successfully", skill, 200); // OK
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postSkill,
  getSkills,
  putSkill,
  deleteSkill,
  showSkill,
};
