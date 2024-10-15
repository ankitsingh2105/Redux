const express = require("express");
const app = express();
const connect = require("./db");
const cors = require("cors");


const { taskModel } = require("./schema")
connect("mongodb://127.0.0.1:27017/ReduxDB");

app.use(express.json());
app.use(cors({
    origin: '*'
}))

app.get("/", (req, response) => {
    response.send("home page");
})


app.post("/addtask", async (req, response) => {
    const { task } = req.body;
    console.log("adding task");
    try {
        const newtask = new taskModel({
            task,
        })
        await newtask.save();
        response.send("task added successfully");
    }
    catch (error) {
        response.send(error);
    }
})

app.get("/getTask", async (req, response) => {
    console.log("getting tasks");
    try {
        const allTasks = await taskModel.find({});
        response.json(allTasks);
    }
    catch (error) {
        response.send(error);
    }
})


app.listen(3000, () => {
    console.log("server is running")
}) 