import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {

    const [characters, setCharacters] = useState([
        { name: "Charlie", job: "Janitor" },
        { name: "Mac", job: "Bouncer" },
        { name: "Dee", job: "Aspiring actress" },
        { name: "Dennis", job: "Bartender" }
    ]);

    function updateList(person) {
        postUser(person)
            .then((res) => {
                if (res.status !== 201) {
                    console.log("POST failed, status:", res.status);
                    return null;
                }
                return res.json();
            })
            .then((createdUser) => {
                if (!createdUser) return;
                setCharacters((prev) => [...prev, createdUser]);
            })
            .catch((error) => console.log(error));
    }

    function deleteUser(id) {
        return fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
    }

    function removeOneCharacter(id) {
        deleteUser(id)
            .then((res) => {
                if (res.status === 204) {
                    setCharacters((prev) => prev.filter((c) => c._id !== id));
                } else if (res.status === 404) {
                    console.log("User not found on server");
                } else {
                    console.log("DELETE failed, status:", res.status);
                }
            })
            .catch((error) => console.log(error));
    }



    function fetchUsers() {
        return fetch("http://localhost:8000/users");
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => console.log(error));
    }, []);

    function postUser(person) {
        return fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(person),
        });
    }


    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;
