import React from 'react'
import {FaCheckDouble, FaEdit, FaRegTrashAlt} from "react-icons/fa"
const Task = ({task,index,deleteTask, getSingleTask,setToComplete}) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
        <p>
            <b>{index+1}.</b>
            <strong>Title: </strong>{task.title}
            <div>
                <strong>Description: </strong>{task.description}
            </div>
        </p>
        <div className='task-icons'>
            <FaCheckDouble color='lightgreen' onClick={()=>
            setToComplete(task)}/>
            <FaEdit color='white' onClick={()=>
            getSingleTask(task)}/>
            <FaRegTrashAlt color='red' onClick={()=>
            deleteTask(task._id)}/>
        </div>
        
    </div>
  )
}

export default Task