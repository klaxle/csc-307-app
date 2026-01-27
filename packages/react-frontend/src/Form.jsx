import React, { useState } from "react";

function Form(props) {
    const [person, setPerson] = useState({ name: "", job: "" });

    function handleChange(e) {
        const { name, value } = e.target;
        setPerson({ ...person, [name]: value });
    }

    function submitForm() {
        props.handleSubmit(person);
        setPerson({ name: "", job: "" });
    }

    return (
        <form>
            <input name="name" value={person.name} onChange={handleChange} />
            <input name="job" value={person.job} onChange={handleChange} />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
}

export default Form;
