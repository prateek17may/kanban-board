import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function Column({
  id,
  title,
  tasks,
  addTask,
  deleteTask,
  onEdit
}) {
  return (
    <div className="column">
      <h2>{title}</h2>
      <button onClick={() => addTask(id)}>+ Add</button>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={() => deleteTask(id, index)}
                onEdit={() => onEdit(task, index)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
