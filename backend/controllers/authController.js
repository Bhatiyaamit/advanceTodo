import generateToken from "../utils/generateToken.js";

export const googleCallback = (req, res) => {
  console.log("Google OAuth callback invoked");
  console.log("Authenticated User:", req.user);
  // if (!req.user) {
  //   return res.redirect(`${process.env.CLIENT_URL}/login`);
  // }

  const token = generateToken(req.user._id);
  console.log("Generated Token:", token);

  res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
};
