import React, { useState, useContext} from "react";
import noteContext from "../context/noteContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { notes, setNotes, addNote } = context;
  const [note, setNote] = useState({title: "", description: "", start_date: new Date().toISOString().split('T')[0], end_date: new Date().toISOString().split('T')[0]});
  const [err, setErr] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addNote(note.title, note.description, note.start_date, note.end_date);
    const apiResponse = await response.json();
    if(response.status === 200){
      let newNotes = notes.concat(apiResponse.data);
      newNotes = newNotes.sort((a, b) => {
        let da = new Date(a.start_date),
            db = new Date(b.start_date);
        return da - db;
    });
      setNotes(newNotes);
      props.showAlert('success', apiResponse.message);
      setNote({title: "", description: "", start_date: new Date().toISOString().split('T')[0], end_date:new Date().toISOString().split('T')[0]});

    }else if(response.status === 422){
      setErr(apiResponse.errors);
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
              required = "required"
            />
            <p style={{ display: 'title' in err ? 'flex' : 'none', color : "red" }} >{'title' in err ? err.title[0]: ''}</p>
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
              required

            />
            <p style={{ display: 'description' in err ? 'flex' : 'none', color : "red" }} >{'description' in err ? err.description[0]: ''}</p>

            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
            <label htmlFor="start_date" className="form-label">
              Start Date
            </label>
            <DatePicker required minDate={new Date()} selected={new Date(note.start_date)} onChange={(date) => setNote({...note, start_date: date.toISOString().split('T')[0]})} />
            <p style={{ display: 'start_date' in err ? 'flex' : 'none', color : "red" }} >{'start_date' in err ? err.start_date[0]: ''}</p>
            
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
            <label htmlFor="end_date" className="form-label">
              End Date
            </label>
            <DatePicker required minDate={new Date(note.start_date)}  selected={new Date(note.end_date)} onChange={(date) => setNote({...note, end_date: date.toISOString().split('T')[0]})} />
            <p style={{ display: 'end_date' in err ? 'flex' : 'none', color : "red" }} >{'end_date' in err ? err.end_date[0]: ''}</p>
            
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
