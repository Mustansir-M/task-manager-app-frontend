import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../App";
import Task from "./Task";
import TaskForm from "./TaskForm";
import loadingImg from "../assets/loading-gif.gif";


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [taskID, setTaskID] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        completed: false,
      });
      const { title,description } = formData;


      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const getTasks = async () => {
        setIsLoading(true);
        try {
          const {data} = await axios.get(`${URL}/api/tasks`);  //destructuring only data
          setTasks(data);
          setIsLoading(false);
        } catch (error) {
          toast.error(error.message);
          setIsLoading(false);
        }
      };
    
      useEffect(() => {  //to fire the getTask function
        getTasks();
      }, []);

      const createTask = async (e) => {
        e.preventDefault();
        if (title === "" && description==="") {
          return toast.error("Input field cannot be empty");
        }
        try {
          await axios.post(`${URL}/api/tasks`, formData);
          toast.success("Task added successfully");
          setFormData({ ...formData, title: "" ,description:""});  // to clear the text field after adding
          getTasks();
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      };

      const deleteTask = async (id) => {
        try {
          await axios.delete(`${URL}/api/tasks/${id}`);
          getTasks();
        } catch (error) {
          toast.error(error.message);
        }
      };
      
    
      useEffect(() => {
        const cTask = tasks.filter((task) => {
          return task.completed === true;
        });
        setCompletedTasks(cTask);
      }, [tasks]);



      const getSingleTask = async (task) => {
        setFormData({ title: task.title,description:task.description, completed: false });
        setTaskID(task._id);
        setIsEditing(true);
      };


      const updateTask = async (e) => {
        e.preventDefault();
        if (title === "" && description==="") {
          return toast.error("Input field cannot be empty.");
        }
        try {
          await axios.put(`${URL}/api/tasks/${taskID}`, formData);
          setFormData({ ...formData, title: "" ,description:""});
          setIsEditing(false);
          getTasks();
        } catch (error) {
          toast.error(error.message);
        }
      };
    
      const setToComplete = async (task) => {
        const newFormData = {
          title: task.title,
          description:task.description,
          completed: true,
        };
        try {
          await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
          getTasks();
        } catch (error) {
          toast.error(error.message);
        }
      };



  return (
    <div>
    <h2>Task Manager App</h2>
    <TaskForm 
        title={title} 
        description={description} 
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
    />

    {tasks.length > 0 && (
        <div className="--flex-between --pb">
            <p style={{color:"black"}}>
                <b>Total Tasks:</b> {tasks.length}
            </p>
            <p style={{color:"black"}}>
                <b>Completed Tasks:</b> {completedTasks.length}
            </p>
        </div>
    )}

    {/* flex center, flex between , pb , --py*/}

    <hr/>
    {
        isLoading && (
            <div className="--flex-center">
                <img src={loadingImg} alt="Loading"/>
            </div>
        )
    }
    {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  )
}

export default TaskList