import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  
  const {deleteNote, notes, setNotes} = context;

  const destroyNote = async(noteId)=>{
    const response = await deleteNote(noteId);
    const apiResponse = await response.json();
    if(response.status === 200){
      const newNote = notes.filter((note) => {
        return note.id !== noteId;
      });
      setNotes(newNote);
      props.showAlert('success', apiResponse.message);
    }else if(response.status === 422){
      props.showAlert('danger', apiResponse.message);
    }else{
      props.showAlert('danger', apiResponse.message);
    }
  }

  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{destroyNote(note.id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>

          <p className="card-text">{note.description}</p>
          <p className="card-text">Start Date: {note.start_date}</p>
          <p className="card-text">End Date: {note.end_date}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
