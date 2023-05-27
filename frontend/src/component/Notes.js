import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteContext from "../context/notes/NotesContext";
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';


export default function Notes() {
    let context = useContext(NoteContext);
    let { notes, getAllNotes,updateNotes } = context;
    let ref = useRef();
    let refClose = useRef();
    const navigate = useNavigate();
    let [tempNote, updateTempNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

    const saveUpdate = () => {  
        updateNotes(tempNote.id, tempNote.etitle, tempNote.edescription, tempNote.etag);      
        refClose.current.click();
    }

    const handleOnchange = (e) => {
        //thre dot indicate spread operator which override and add the other property
        updateTempNote({ ...tempNote, [e.target.name]: e.target.value });
    }

    const openModal=(currentNote)=>{
        updateTempNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag} )
        ref.current.click();
    }
    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("/login");
            return;
        }
        getAllNotes();
        // eslint-disable-next-line
    }, []);
    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form spellCheck="false">
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" onChange={handleOnchange} id="etag" name="etag" value={tempNote.etag} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" onChange={handleOnchange} id="etitle" name="etitle" value={tempNote.etitle}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" onChange={handleOnchange} rows="3" value={tempNote.edescription}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveUpdate}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='container'>
                    {notes.length<1 && "No notes available."}
                </div>
                {}
                {
                    notes.map((notes, index) => {
                        return <NoteItem notes={notes} openModal={openModal} key={index} />;
                    })
                }
            </div>
        </>

    )
}
