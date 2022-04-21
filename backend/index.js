const tasks = require("./routes/tasks")
const db = require("./config/db/db");
const cors = require("cors");
const express = require('express');
const app = express();
const port = 8080

db.connect();

app.use(express.json())
app.use(cors())

app.use("/api/tasks", tasks)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})