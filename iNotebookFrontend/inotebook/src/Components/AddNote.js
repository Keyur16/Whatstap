import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';


const AddNote = () => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value })
    }

    

  return (
    <div>


        <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" minLength={5} required value={note.description} className="form-control" id="description" name="description" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="text" minLength={5} required value={note.tag} className="form-control" id="tag" name="tag" onChange={onChange}/>
          </div>
          
          <button disabled={note.description.length < 5 || note.tag.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
        </div>


    </div>
  )
}

export default AddNote
