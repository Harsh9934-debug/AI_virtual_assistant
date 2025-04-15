import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import bodyParser from "body-parser";
import virtualRoute from "./routes/virtualRoute.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 1, // Limit each IP to 1 request per second
    message: "Too many requests, please try again later.",
});

app.use('/jarvis/virtualAssistant', limiter);

app.get("/", (req, res) => {
    res.render("main");
});

app.use('/jarvis', virtualRoute);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`.bgGreen.white);
});