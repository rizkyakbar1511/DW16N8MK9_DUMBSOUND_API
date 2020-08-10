const express = require("express");
const router = express.Router();

const {
  read: findUsers,
  readOne: findUser,
  deleteOne: deleteUser,
} = require("../controllers/user");
const {
  readArtists: findArtists,
  readArtist: findArtist,
  createArtist: addArtist,
  deleteArtist,
  editArtist,
} = require("../controllers/artis");

const {
  readMusic: findMusics,
  createMusic: addMusic,
  editMusic,
  deleteMusic,
} = require("../controllers/music");

const { register, login } = require("../controllers/auth");
const { auth, previllegeCheck } = require("../middleware/auth");
const { subsChecker } = require("../middleware/subsChecker");

const {
  readTransactions: findTransactions,
  createTransaction: addTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transaction");

//Authentication users
router.post("/register", register);
router.post("/login", login);

//User Routes
router.get("/users", auth, previllegeCheck, findUsers);
router.get("/user", auth, findUser);
router.delete("/user/:id", auth, previllegeCheck, deleteUser); //POSTMAN

//Artis Routes
router.get("/artists", findArtists);
router.get("/artist", findArtist);
router.post("/artis", addArtist);
router.patch("/artis/:id", auth, previllegeCheck, editArtist); //POSTMAN
router.delete("/artis/:id", auth, previllegeCheck, deleteArtist); //POSTMAN

//Music Routes
router.get("/musics", findMusics);
router.post("/music", addMusic);
router.patch("/music/:id", auth, previllegeCheck, editMusic); //POSTMAN
router.delete("/music/:id", auth, previllegeCheck, deleteMusic); //POSTMAN

//Transactions Routes
router.get("/transactions", findTransactions); // auth, previllegeCheck, <-- Error please fix this middleware
router.post("/transaction", auth, addTransaction);
router.patch("/transaction/:id", editTransaction); // auth, previllegeCheck, <-- Error please fix this middleware
router.delete("/transaction/:id", auth, previllegeCheck, deleteTransaction);

//Other routes
router.get("*", (req, res) => {
  res.status(404).send({ error: "404 Not Found" });
});

module.exports = router;
