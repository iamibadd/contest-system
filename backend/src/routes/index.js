const express = require("express");
const authRoute = require("./auth.route");
const contestRoute = require("./contest.route");
const participateRoute = require("./participation.route");
const leaderboardRoute = require("./leaderboard.route");

const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/contest",
    route: contestRoute,
  },
  {
    path: "/participate",
    route: participateRoute,
  },
  {
    path: "/leaderboard",
    route: leaderboardRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
