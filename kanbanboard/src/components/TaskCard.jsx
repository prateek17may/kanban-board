import { Draggable } from "@hello-pangea/dnd";

export default function TaskCard({ task, index, onDelete, onEdit }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={onEdit}
        >
          <p>{task.title}</p>
          <div>
            <button onClick={onEdit}>✏</button>
            <button onClick={onDelete}>✖</button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
