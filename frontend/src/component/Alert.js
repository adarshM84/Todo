import { useContext } from 'react';
import NotesContext from '../context/notes/NotesContext';
export default function Alert() {
    let context = useContext(NotesContext);
    let { alertInfo } = context;
    return (
        <>
            {alertInfo.showAlert ? <div>
                <div className={`alert alert-${alertInfo.alertType} alert-dismissible fade show text-center`} role="alert" style={{ height: "60px" }}>
                    <strong>{alertInfo.message}</strong>
                </div>
            </div> : ""}
        </>

    )
}
