import noteContext from "./NotesContext";
import { useState } from "react";
const NoteState = (props) => {
    let host = "http://localhost:4000";
    let initialNotes = [];
    let [notes, setNotes] = useState(initialNotes);
    let [alertInfo,changeAlert]=useState({showAlert:false,alertType:"",message:""});

    const hideAlert=()=>{
        changeAlert({...alertInfo,showAlert:true});
    }

    const getAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            }
        });
        const json = await response.json();
        if (response.status === 200) {
            setNotes(json);
            //console.log(json, "response")
        } else {
            changeAlert({showAlert:true,alertType:"danger",message:"Network error.Check the network and refresh the page."});
        }

    }

    //Add Notes
    const addNotes = async (title, description, tag) => {
        //Add in database
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag })
        });

        let json = await response.json();

        if (response.status === 200) {
            //console.log(json);
            setNotes(notes.concat(json));
            changeAlert({showAlert:true,alertType:"success",message:"Successfully notes added."});
            setTimeout(hideAlert, 1500);
        } else {
            //console.log(json)
            changeAlert({showAlert:true,alertType:"danger",message:"Network error.Check the network and refresh the page."});
        }

    }
    //Delete Notes
    const deleteNotes = async (id) => {
        //console.log("delete called", "deleteNotes")
        //Delete in database
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            }
        });
        if (response.status === 200) {
            //console.log("delete response", json);

            //console.log("deleting node id" + id)
            let newNote = notes.filter((item) => { return item._id !== id })
            setNotes(newNote);
            changeAlert({showAlert:true,alertType:"success",message:"Successfully notes deleted."});
            setTimeout(hideAlert, 1500);
        } else {
            changeAlert({showAlert:true,alertType:"danger",message:"Network error.Check the network and refresh the page."});
        }
    }
    //Update Notes
    const updateNotes = async (id, title, description, tag) => {
        //console.log(id, title, description, tag)
        //Edit in database
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag })
        });

        //console.log(response.json());

        let newNotes = JSON.parse(JSON.stringify(notes));
        if (response.status == 200) {
            changeAlert({showAlert:true,alertType:"success",message:"Successfully notes updated."});
            setTimeout(hideAlert, 1500);
            //Edit in client
            for (let index = 0; index < newNotes.length; index++) {
                if (newNotes[index]._id === id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
                }
            }
            //console.log(newNotes,"newNotes")
            setNotes(newNotes);
        }else{
            changeAlert({showAlert:true,alertType:"danger",message:"Network error.Check the network and refresh the page."}); 
        }
    }


    return (<noteContext.Provider value={{ notes, addNotes, deleteNotes, updateNotes, getAllNotes,alertInfo,changeAlert }}>
        {props.children}
    </noteContext.Provider>)
}

export default NoteState;