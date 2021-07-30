const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connecting to the Database
connectDB();

app.get('/',(req,res) => res.send('API running'));
//"re.send" sends data to the browser

const PORT = process.env.PORT || 4000; 

/*
looks for an environment variable called "PORT"; helps when deploying with Heroku and supplies the port number.If there is no environment variable set, it will run at local port 5000.
*/

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));

// callback condition in case the Port connects with local or cloud port 
