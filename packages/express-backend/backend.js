import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import mongoose from "mongoose";
import * as userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
    .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
    .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use(express.json());

app.get("/users", (req, res) => {
    const { name, job } = req.query;

    // name + job
    if (name !== undefined && job !== undefined) {
        return userService
            .findUsersByNameAndJob(name, job)
            .then((users) => res.send({ users_list: users }))
            .catch((err) => res.status(500).send(err.toString()));
    }

    // name only
    if (name !== undefined) {
        return userService
            .findUserByName(name)
            .then((users) => res.send({ users_list: users }))
            .catch((err) => res.status(500).send(err.toString()));
    }

    // job only
    if (job !== undefined) {
        return userService
            .findUserByJob(job)
            .then((users) => res.send({ users_list: users }))
            .catch((err) => res.status(500).send(err.toString()));
    }

    // all users
    return userService
        .getUsers()
        .then((users) => res.send({ users_list: users }))
        .catch((err) => res.status(500).send(err.toString()));
});


app.get("/users/:id", (req, res) => {
    const { id } = req.params;

    userService
        .findUserById(id)
        .then((user) => {
            if (!user) return res.status(404).send("Resource not found.");
            res.send(user);
        })
        .catch((err) => res.status(500).send(err.toString()));
});


app.get("/users", (req, res) => {
    const { name, job } = req.query;

    if (name !== undefined && job !== undefined) {
        return res.send({ users_list: findUsersByNameAndJob(name, job) });
    }

    if (name !== undefined) {
        return res.send({ users_list: findUserByName(name) });
    }

    res.send(users);
});


app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    userService
        .deleteUserById(id)
        .then((deleted) => {
            if (!deleted) return res.status(404).send("Resource not found.");
            return res.status(204).send();
        })
        .catch((err) => res.status(500).send(err.toString()));
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/users", (req, res) => {
    userService
        .addUser(req.body)
        .then((created) => res.status(201).send(created))
        .catch((err) => res.status(500).send(err.toString()));
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
