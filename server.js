const express = require("express");
const path = require("path");

const initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));

app.get("/", (req, res) => {
    res.sendFile(path.join(initial_path, "index.htm"));
});

app.get("/:id", (req, res) => {
    res.sendFile(path.join(initial_path, "about.htm"));
});

app.use((req, res) => {
    res.json("404");
});

app.listen(process.env.PORT || 2088, () => {
    console.log("listening on port 2088");
});