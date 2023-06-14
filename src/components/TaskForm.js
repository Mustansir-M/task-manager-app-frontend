const TaskForm = ({
    createTask,
    title,
    description,
    handleInputChange,
    isEditing,
    updateTask,
  }) => {
    return (
      <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
        <input
          type="text"
          placeholder="Add a Title"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Add a Description"
          name="description"
          value={description}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? "Edit" : "Add"}</button>
      </form>
    );
  };
  
  export default TaskForm;