import React, { useState, useContext } from "react";
import { json } from "react-router-dom";
import noteContext from "../context/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { notes, setNotes, addNote } = context;
  const [note, setNote] = useState({title: "", description: "", start_date: "", end_date: ""});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addNote(note.title, note.description, note.start_date, note.end_date);
    const apiResponse = await response.json();
    if(response.status === 200){
      setNotes(notes.concat(apiResponse.data));
      props.showAlert('success', apiResponse.message);
      setNote({title: "", description: "", start_date: "", end_date:""});

    }else if(response.status === 422){
      props.showAlert('danger', apiResponse.message);
    }else{
      props.showAlert('danger', apiResponse.message);
    }
  };

  const handleOnchange = (event) => {
      setNote({...note, [event.target.name]: event.target.value});
  }


  return (
    <div>
      <h2 className="my-3"> Add your Events</h2>
      <form className="my-3">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={handleOnchange}
              value={note.title}
            />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleOnchange}
              value={note.description}

            />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
            <label htmlFor="start_date" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              id="start_date"
              name="start_date"
              onChange={handleOnchange}
              value={note.start_date}
            />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
            <label htmlFor="end_date" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              id="end_date"
              name="end_date"
              onChange={handleOnchange}
              value={note.end_date}
            />
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddNote;
