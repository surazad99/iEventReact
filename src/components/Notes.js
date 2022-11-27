import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const closeRef = useRef(null);

  const [note, setNote] = useState({title: "", description: "", start_date: "", end_date:""});

  const updateNote = (note) => {
    ref.current.click();
    setNote(note);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await editNote(note.id, note.title, note.description, note.start_date, note.end_date);
    const responseJson = await response.json();
    if(response.status==200){
      props.showAlert('success', responseJson.message);
    }
    closeRef.current.click();

  };

  const handleOnchange = (event) => {
      setNote({...note, [event.target.name]: event.target.value});
  }

  const handleFilter = (event) => {
    getNotes(event.target.value);
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={note.description}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="start_date" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="start_date"
                    name="start_date"
                    value={note.start_date}
                    onChange={handleOnchange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="start_date" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="end_date"
                    name="end_date"
                    value={note.end_date}
                    onChange={handleOnchange}
                  />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Update Event
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-md-6">
          <h2>Your Events</h2>
        </div>
        <div className="col-md-6">
          <form>
          <select className="form-select" defaultValue={'all'} aria-label="filter events" onChange={handleFilter}>
            <option value="all" disabled>Filter Events By</option>
            <option value="finished">Finished</option>
            <option value="finished7">Finished from last 7 days</option>
            <option value="upcoming">Upcoming</option>
            <option value="upcoming7">Upcoming within 7 days</option>
            <option value="all">All Events</option>
          </select>
          </form>
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note.id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
