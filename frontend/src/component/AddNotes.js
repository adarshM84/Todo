import { useContext, useState } from 'react';
import NoteContext from "../context/notes/NotesContext.js";

export default function AddNotes() {
    let context = useContext(NoteContext);
    let { addNotes } = context;

    let [tempNote, updateTempNote] = useState({ title: "", description: "", tag: "" });

    const saveNote = (e) => {
        e.preventDefault();
        addNotes(tempNote.title, tempNote.description, tempNote.tag);
        updateTempNote({ title: "", description: "", tag: "" });
    }

    const handleOnchange = (e) => {
        //thre dot indicate spread operator which override and add the other property
        updateTempNote({ ...tempNote, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add Notes</h2>
                <form spellCheck="false">
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" onChange={handleOnchange} id="tag" placeholder='Enter min 3 length tag' value={tempNote.tag} name="tag" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" onChange={handleOnchange} id="title" placeholder='Enter min 3 length title' value={tempNote.title} name="title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" placeholder='Enter min 3 length description' value={tempNote.description} onChange={handleOnchange} rows="3"></textarea>
                    </div>
                    <button disabled={tempNote.title.trim().length<3 || tempNote.description.trim().length<3 || tempNote.tag.trim().length<3} type='submit' onClick={saveNote} className="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    )
}
