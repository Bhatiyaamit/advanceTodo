import dotenv from "dotenv";
dotenv.config();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

export default corsOptions;