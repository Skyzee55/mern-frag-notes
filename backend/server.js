import express from "express";
import dotenv from "dotenv";
import noteRoute from "./routes/noteRoute.js";
import cors from 'cors'
import path from 'path'
import connectDB from "./lib/db.js";
import { rateLimiter } from "./middlewares/noteMiddleware.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if(process.env.NODE_ENV != 'production') {
  app.use(cors({
    origin : "http://localhost:5173",
    
  }))
}
app.use(rateLimiter);

app.use("/api/notes", noteRoute);

if(process.env.NODE_ENV == 'production') {
  
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  
  app.get("/*path", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
  })
  }
  
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running in ${PORT} Port`);
  });
});
