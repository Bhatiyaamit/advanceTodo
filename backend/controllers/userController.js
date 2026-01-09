import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

export const getPreferences = asyncHandler(async (req, res) => {
  res.json({
    theme: req.user.theme,
    name: req.user.name,
    avatar: req.user.avatar,
  });
});

export const updatePreferences = asyncHandler(async (req, res) => {
  const { theme, name, avatar } = req.body;

  if (theme) {
    req.user.theme = theme;
  }
  if (name !== undefined) {
    req.user.name = name;
  }
  if (avatar !== undefined) {
    req.user.avatar = avatar;
  }

  await req.user.save();

  res.json({
    theme: req.user.theme,
    name: req.user.name,
    avatar: req.user.avatar,
  });
});
