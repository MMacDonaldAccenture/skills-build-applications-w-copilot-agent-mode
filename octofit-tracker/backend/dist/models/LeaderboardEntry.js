"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    rank: { type: Number, required: true, unique: true },
    userName: { type: String, required: true },
    points: { type: Number, required: true },
    streak: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)('LeaderboardEntry', leaderboardEntrySchema);
