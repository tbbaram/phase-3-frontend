import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';

function Category({ category }) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        setTasks(category.tasks)
    }, [category.tasks])
    

    return (
        <div>
            <h2 className="category-title">{category.category}</h2>
                {tasks.map((task) => {
                return (
                    <div className="tasks" key={task.id}>
                    <Task 
                    key={task.id}
                    task={task}
                    description={task.description}
                    priority={task.priority}
                    categoryId={category.id}
                    tasks={tasks}
                    setTasks={setTasks}
                    />
                    </div>
                    )
                    })}
                    <div className="task-form">
                    <TaskForm 
                    categoryId={category.id}
                    tasks={tasks}
                    setTasks={setTasks}
                    />
                    </div>
                    </div>
                    )
                }

export default Category