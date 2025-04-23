const express = require("express");
const { authenticate } = require("../middleware/authHandler");
const {
  postSkill,
  deleteSkill,
  putSkill,
  getSkills,
  showSkill,
} = require("../controllers/skillsController");

const router = express.Router();

router.post("/skills", authenticate, postSkill); // Only authenticated users can create a skill
router.get("/skills", getSkills); // GET: /api/skills
router.put("/skills/:id", authenticate, putSkill); // PUT: /api/skills/:id
router.delete("/skills/:id", authenticate, deleteSkill); // DELETE: /api/skills/:id
router.get("/skills/:id", showSkill); // DELETE: /api/skills/:id

module.exports = router;
