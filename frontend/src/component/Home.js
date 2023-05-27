import AddNotes from "./AddNotes";
import Notes from "./Notes";
export default function Home() {
  return (
    <>
      <AddNotes />
      <div className="container my-3">
        <h2>All Notes</h2>
        <Notes />
      </div>
    </>

  )
}
