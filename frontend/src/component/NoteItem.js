import React,{useContext} from 'react';
import NoteContext from "../context/notes/NotesContext";

export default function NoteItem(props) {
    // console.log(props,"props");
    let context=useContext(NoteContext);
    let {deleteNotes}=context;

    return (
        <div className="my-3 col-md-3">
            <div className='card text-bg-light'>
                <div className="card-header"><strong>{props.notes.tag.toUpperCase()}</strong><i className="fas fa-trash mx-2 text-danger" onClick={()=>{deleteNotes(props.notes._id)}}></i><i className="fas fa-edit mx-1 text-warning" onClick={()=>{props.openModal(props.notes)}}></i></div>
                <div className="card-body">
                    <h5 className="card-text">{props.notes.title.toUpperCase()}</h5>
                    <p className="card-text">{props.notes.description}</p>
                </div>
            </div>
        </div>
    )
}
