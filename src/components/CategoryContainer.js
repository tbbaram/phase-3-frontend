import React from "react";
import Category from "./Category"

function CategoryContainer({ categories }) {

    return (
        <div className="container">
            {categories.map((category) => {
                return (  
                <Category
                key={category.id}
                category={category}
                /> 
            )})}
        </div>   
    )
}


export default CategoryContainer