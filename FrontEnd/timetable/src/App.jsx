import React, { useEffect, useState } from "react";
import axios from "axios";
import TimetableForm from "./components/TimetableForm";
import TimetableList from "./components/TimetableList";
import config from "./components/config";
import "./style.css";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({});
  const [editMode, setEditMode] = useState(false);

  // Fetch all entries
  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/all`);
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Save or update entry
  const saveEntry = async () => {
    if (!currentEntry.subject || !currentEntry.teacher) return;

    try {
      if (editMode) {
        await axios.put(`${config.baseUrl}/update`, currentEntry);
      } else {
        await axios.post(`${config.baseUrl}/add`, currentEntry);
      }
      setCurrentEntry({});
      setEditMode(false);
      fetchEntries();
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  // Edit entry
  const editEntry = (entry) => {
    setCurrentEntry(entry);
    setEditMode(true);
  };

  // Delete entry
  const deleteEntry = async (id) => {
    try {
      await axios.delete(`${config.baseUrl}/delete/${id}`);
      fetchEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const resetForm = () => {
    setCurrentEntry({});
    setEditMode(false);
  };

  return (
    <div className="container">
      <h1 className="app-heading">📅 Timetable Manager</h1>

      {/* Dashboard Cards */}
      

      {/* Form */}
      <TimetableForm
        entry={currentEntry}
        setEntry={setCurrentEntry}
        saveEntry={saveEntry}
        editMode={editMode}
        resetForm={resetForm}
      />

      {/* Table List */}
      <TimetableList
        entries={entries}
        editEntry={editEntry}
        deleteEntry={deleteEntry}
      />
    </div>
  );
}
