const router = require("express").Router();
const {
  authenticate,
  authenticateRefreshToken,
  invalidateTokens,
  authorizeAdmin,
} = require("../middleware/authorization");

const {
  createuser,
  loginuser,
  logoutuser,
  createquote,
  getUserQuotes,
  removeQuote,
  deleteuser,
  upgradeuser,
  refreshUser,
  getMyQuotes,
  getRandomQuote,
} = require("../controllers/usercontroller");

// all users
router.get("/", getRandomQuote);
router.get("/:username", getUserQuotes);

// router.get("/random", getRandomQuote);

//Authentication
router.post("/create-user", createuser);
router.post("/loginuser", loginuser);
router.post("/refreshuser", authenticateRefreshToken, refreshUser);
router.post("/logout", invalidateTokens, logoutuser);

//Protected routes
//router.post("/create-todo", authenticate, createtodo);
router.post("/create-quote", authenticate, createquote);
router.post("/get-quote", authenticate, getMyQuotes);

router.delete("/remove-quote", authenticate, removeQuote);
router.delete("/delete-user", authenticate, authorizeAdmin, deleteuser);
router.patch("/create-admin", authenticate, authorizeAdmin, upgradeuser);

module.exports = router;
