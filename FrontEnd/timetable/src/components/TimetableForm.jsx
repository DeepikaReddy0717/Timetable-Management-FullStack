import React from 'react';

export default function TimetableForm({ entry, setEntry, saveEntry, editMode, resetForm }) {
  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-block">
      <h2>{editMode ? "Edit Timetable Entry" : "Add Timetable Entry"}</h2>
      <div className="form-grid">
        <input
          type="text"
          name="subject"
          placeholder="Subject Name"
          value={entry.subject || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="teacher"
          placeholder="Teacher Name"
          value={entry.teacher || ""}
          onChange={handleChange}
        />
        <select name="day" value={entry.day || ""} onChange={handleChange}>
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
        <input
          type="time"
          name="time"
          value={entry.time || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="room"
          placeholder="Room Number"
          value={entry.room || ""}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          className={editMode ? "btn-green" : "btn-blue"}
          onClick={saveEntry}
        >
          {editMode ? "Update Entry" : "Add Entry"}
        </button>
        {editMode && (
          <button className="btn-gray" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
