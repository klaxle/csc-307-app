import express from "express";

const app = express();
const port = 8000;

const findUsersByNameAndJob = (name, job) => {
    return users.users_list.filter((u) => u.name === name && u.job === job);
};


const findUserByName = (name) => {
    return users.users_list.filter((user) => user.name === name);
};

const findUserById = (id) => {
    return users.users_list.find((user) => user.id === id);
};

const addUser = (user) => {
    users.users_list.push(user);
    return user;
};

const deleteUserById = (id) => {
    const index = users.users_list.findIndex((u) => u.id === id);
    if (index === -1) return false;
    users.users_list.splice(index, 1);
    return true;
};


const users = {
    users_list: [
        { id: "xyz789", name: "Charlie", job: "Janitor" },
        { id: "abc123", name: "Mac", job: "Bouncer" },
        { id: "ppp222", name: "Mac", job: "Professor" },
        { id: "yat999", name: "Dee", job: "Aspring actress" },
        { id: "zap555", name: "Dennis", job: "Bartender" }
    ]
};

app.use(express.json());

app.get("/users", (req, res) => {
    const name = req.query.name;

    if (name !== undefined) {
        const result = findUserByName(name);
        res.send({ users_list: result });
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const result = findUserById(id);

    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
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
    const id = req.params.id;
    const ok = deleteUserById(id);

    if (!ok) {
        res.status(404).send("Resource not found.");
    } else {
        res.status(204).send(); // No Content
    }
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
