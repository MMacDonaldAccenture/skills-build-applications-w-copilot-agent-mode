"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_js_1 = require("./config.js");
const User_js_1 = __importDefault(require("./models/User.js"));
const Team_js_1 = __importDefault(require("./models/Team.js"));
const Activity_js_1 = __importDefault(require("./models/Activity.js"));
const LeaderboardEntry_js_1 = __importDefault(require("./models/LeaderboardEntry.js"));
const Workout_js_1 = __importDefault(require("./models/Workout.js"));
const router = (0, express_1.Router)();
router.get('/api/users', async (_req, res) => {
    const users = await User_js_1.default.find({}).lean();
    res.json({ baseUrl: (0, config_js_1.getApiBaseUrl)(), data: users });
});
router.get('/api/teams', async (_req, res) => {
    const teams = await Team_js_1.default.find({}).lean();
    res.json({ baseUrl: (0, config_js_1.getApiBaseUrl)(), data: teams });
});
router.get('/api/activities', async (_req, res) => {
    const activities = await Activity_js_1.default.find({}).lean();
    res.json({ baseUrl: (0, config_js_1.getApiBaseUrl)(), data: activities });
});
router.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await LeaderboardEntry_js_1.default.find({}).sort({ rank: 1 }).lean();
    res.json({ baseUrl: (0, config_js_1.getApiBaseUrl)(), data: leaderboard });
});
router.get('/api/workouts', async (_req, res) => {
    const workouts = await Workout_js_1.default.find({}).lean();
    res.json({ baseUrl: (0, config_js_1.getApiBaseUrl)(), data: workouts });
});
exports.default = router;
