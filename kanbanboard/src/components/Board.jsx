import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import useLocalStorage from "../hooks/useLocalStorage";
import EditTaskModal from "./EditTaskModal";
import { useState } from "react";

const initialData = {
  todo: [],
  progress: [],
  done: []
};

export default function Board() {
  const [columns, setColumns] = useLocalStorage("kanban", initialData);
  const [editing, setEditing] = useState(null);
  
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];

    const [moved] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, moved);

    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    });
  };

  const addTask = (col) => {
    const title = prompt("Task title?");
    if (!title) return;

    setColumns({
      ...columns,
      [col]: [...columns[col], { id: Date.now(), title }]
    });
  };

  const deleteTask = (col, index) => {
    const updated = [...columns[col]];
    updated.splice(index, 1);
    setColumns({ ...columns, [col]: updated });
  };

  const saveEdit = (colId, index, newTitle) => {
    const updated = [...columns[colId]];
    updated[index] = { ...updated[index], title: newTitle };
    setColumns({ ...columns, [colId]: updated });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.entries(columns).map(([key, tasks]) => (
            <Column
              key={key}
              id={key}
              title={key.toUpperCase()}
              tasks={tasks}
              addTask={addTask}
              deleteTask={deleteTask}
              onEdit={(task, index) =>
                setEditing({ ...task, colId: key, index })
              }
            />
          ))}
        </div>
      </DragDropContext>

      {editing && (
        <EditTaskModal
          task={editing}
          onSave={(title) =>
            saveEdit(editing.colId, editing.index, title)
          }
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}
