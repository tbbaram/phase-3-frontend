import React, { useState } from 'react';


function CategoryForm({ handleNewCategory }) {
    const [category, setCategory] = useState("")

    function changeCategory(e) {
        setCategory(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        fetch("http://localhost:9292/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: category
            })
        })
        .then(r => r.json())
        .then(data => handleNewCategory(data))
        setCategory("")
    }


    return (
        <form onSubmit={handleSubmit} className="category-form">
            <input 
            name="category"
            type="text"
            placeholder="category"
            onChange={changeCategory}
            value={category}
            />

            <input type="submit" value="Add Category" />
        </form>
    )
}

export default CategoryForm