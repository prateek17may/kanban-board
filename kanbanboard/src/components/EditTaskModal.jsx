import { useState } from "react";

export default function EditTaskModal({ task, onSave, onClose }) {
  const [value, setValue] = useState(task.title);

  const handleSave = () => {
    if (!value.trim()) return;
    onSave(value);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Task</h3>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />

        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
