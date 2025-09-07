import React from 'react';

export default function TimetableList({ entries, editEntry, deleteEntry }) {
  if (!entries.length) return <p className="empty-list">No timetable entries available.</p>;

  return (
    <div className="table-wrapper">
      <table className="timetable-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Day</th>
            <th>Time</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.subject}</td>
              <td>{entry.teacher}</td>
              <td>{entry.day}</td>
              <td>{entry.time}</td>
              <td>{entry.room}</td>
              <td>
                <button className="btn-green" onClick={() => editEntry(entry)}>Edit</button>
                <button className="btn-red" onClick={() => deleteEntry(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
