import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

export const getPreferences = asyncHandler(async (req, res) => {
  res.json(req.user.theme);
});

export const updatePreferences = asyncHandler(async (req, res) => {
  req.user.theme = req.body;
  await req.user.save();
  res.json(req.user.theme);
});