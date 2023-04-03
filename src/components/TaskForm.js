import React, { useState, useEffect } from 'react';

function TaskForm({ categoryId, tasks, setTasks, editableTask, setIsEditing }) {

    const [task, setTask] = useState({
        name: "",
        description: "",
        priority: 1
    })

    useEffect(() => {
        if (editableTask) {
            setTask({
                name: editableTask.name,
                description: editableTask.description,
                priority: editableTask.priority
            })
        }
    }, [editableTask])

    const handleUpdateTask = (key, value) => {
        setTask({...task, [key]: value})
    }

    const addTask = (newTask) => {
        const newArray = [...tasks, newTask]
        setTasks(newArray)
    }

    const handleClearTask = () => {
        setTask({
            name: "",
            description: "",
            priority: 0
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        editableTask ? 
            fetch(`http://localhost:9292/tasks/${editableTask.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: task.name,
                    description: task.description,
                    priority: task.priority
                })
            })
                .then(r => r.json())
                .then((data) => {
                    const arrayTaskRemoved = tasks.filter(task => task.id !== editableTask.id)
                    setTasks([...arrayTaskRemoved, data])
                    setIsEditing(false)
                })
            : 

        fetch("http://localhost:9292/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: task.name,
                description: task.description,
                priority: task.priority,
                category_id: categoryId
            })
        })
        .then(r => r.json())
        .then(data => addTask(data))

        handleClearTask()
    }
    
    return (
        <form onSubmit={handleSubmit} className="task-inputs"> 
            <input
            name="name"
            value={task.name}
            onChange={(e) => handleUpdateTask('name', e.target.value)}
            placeholder="task name"
            />
            <input
            name="description"
            value={task.description}
            onChange={(e) => handleUpdateTask('description', e.target.value)}
            placeholder="description"
            />
            <input 
            name="priority"
            type="number"
            max={5}
            min={1}
            value={task.priority}
            onChange={(e) => handleUpdateTask('priority', e.target.value)}
            placeholder="priority 1-5"
            />
            
            
            {editableTask ? 
            (
                <input type="submit" value="Edit Task" />
            ) : (
                <input type="submit" value="Add Task" />
            )}
        </form>
    )
}

export default TaskForm