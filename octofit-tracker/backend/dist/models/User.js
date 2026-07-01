"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
    location: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('User', userSchema);
