import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { BrowserRouter } from 'react-router-dom';

function Task({ task, categoryId, setTasks, tasks }) {
    const [isEditing, setIsEditing] = useState(false)

    const removeTask = (id) => {
        const removedTaskArray = tasks.filter(removedTask => removedTask.id !== id)
        fetch(`http://localhost:9292/tasks/${task.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(() => {
            setTasks(removedTaskArray)
        })
    }

    return (
        <div>
        {isEditing ? (
            <TaskForm 
            categoryId={categoryId} 
            tasks={tasks} 
            setTasks={setTasks} 
            editableTask={task}  
            setIsEditing={setIsEditing} 
            />
        ) : (
            <div>
            <em>Task:</em> {task.name}
            <br />
            <em>Description:</em> {task.description}
            <br />
            <em>Priority:</em> {task.priority}
            <button onClick={() => removeTask(task.id)}>Delete Task</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
        )}
        </div>
    )
}


export default Task