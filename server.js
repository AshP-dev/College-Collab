const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Init Middleware (to make req.body to work in User.js)
app.use(express.json({ extended: false }));

// Connecting to the Database
connectDB();

app.get("/", (req, res) => res.send("API running"));
//"re.send" sends data to the browser

//Define Routes
app.use("/api/users", require("./config/routes/api/users"));
//here, "/api/users" is the endpoint that pertains to the mentioned user's files
app.use("/api/auth", require("./config/routes/api/auth"));
app.use("/api/profile", require("./config/routes/api/profile"));
app.use("/api/posts", require("./config/routes/api/posts"));

const PORT = process.env.PORT || 4000;

/*
looks for an environment variable called "PORT"; helps when deploying with Heroku and supplies the port number.If there is no environment variable set, it will run at local port 5000.
*/

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));

// callback condition in case the Port connects with local or cloud port
