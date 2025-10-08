import express from "express";
import dotenv from "dotenv";
import noteRoute from "./routes/noteRoute.js";
import cors from 'cors'
import connectDB from "./lib/db.js";
import { rateLimiter } from "./middlewares/noteMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("API Works");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin : "http://localhost:5173",
  
}))
app.use(rateLimiter);

app.use("/api/notes", noteRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running in ${PORT} Port`);
  });
});
