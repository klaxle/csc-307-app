import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function updateList(person) {
    setCharacters([...characters, person]);
}

<Form handleSubmit={updateList} />

function MyApp() {
    const [characters, setCharacters] = useState([
        { name: "Charlie", job: "Janitor" },
        { name: "Mac", job: "Bouncer" },
        { name: "Dee", job: "Aspiring actress" },
        { name: "Dennis", job: "Bartender" }
    ]);

    function removeOneCharacter(index) {
        setCharacters(characters.filter((_, i) => i !== index));
    }

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
        </div>
    );
}

export default MyApp;
