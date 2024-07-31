const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
require("./src/database/connection");
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
});

 