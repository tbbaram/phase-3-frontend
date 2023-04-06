import React, { useState, useEffect } from 'react';
import CategoryContainer from './CategoryContainer';
import CategoryForm from "./CategoryForm";

function App() {
  const [categories, setCategories] = useState([])

  const tasks = categories.map((task) => {
    return task.tasks
  })
  console.log(tasks)

  // handle add new task within app. 
  // create restful
  // handle taskUpdate 
  // handle taskDelete 

  const handleNewCategory = (newCategory) => {
    const newArr = [...categories, newCategory]
    setCategories(newArr)
}

  useEffect(() => {
    fetchAllTasks()
  }, [])

  function fetchAllTasks() {
    fetch(`http://localhost:9292/categories`)
    .then(r => r.json())
    .then(categories => setCategories(categories))
  }
 
  return (
    <div>
      <CategoryForm 
      handleNewCategory={handleNewCategory}
      />
      <CategoryContainer 
      key={categories.id}
      categories={categories}
      />
    </div>
  )
}

export default App;
