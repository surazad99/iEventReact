import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_HOST;
  const [notes, setNotes] = useState([]);
  
  //Get All Notes
  const getNotes = async (filterBy="all") => {
    //Api call
    const response = await fetch(`${host}/api/event?filter_by=${filterBy}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Authorization":
          localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    setNotes(data.data);
    return response;
  };
  //Add Note
  const addNote = async (title, description, start_date, end_date) => {
    //Add Note through Api
    const response = await fetch(`${host}/api/event`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Authorization":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, start_date, end_date}),
    });

    return response;
  };

  //Edit Note
  const editNote = async (id, title, description, start_date, end_date) => {
    //Api call to edit the note
    const response = await fetch(`${host}/api/event/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Authorization":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, start_date, end_date }),
    });
    if (response.status === 200) {
      //Logic to edit in client
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        let element = newNotes[index];
        if (element.id === id) {
          element.title = title;
          element.description = description;
          element.start_date = start_date;
          element.end_date = end_date;
          break;
        }
      }
      setNotes(newNotes);
      return response;
    }
  };
  //Delete Note
  const deleteNote = async (id) => {
    

    //Delete Note through Api
    const response = await fetch(`${host}/api/event/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Authorization":
          localStorage.getItem('token'),
      },
    });
    return response;
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, getNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
