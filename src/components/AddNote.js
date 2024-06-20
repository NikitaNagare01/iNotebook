import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext'

function AddNote() {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setnote] = useState({title : "", description : "", tag : ""});

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title : "", description : "", tag : ""});
    }

    const onChange=(e)=>{
        setnote({...note, [e.target.name] : e.target.value});
    }

  return (
    <div>

        <h2 className='container my-3'> Add a Note</h2>

        <form className='container my-3'>
                <div className="mb-3 row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text"  className="form-control" id="title" name='title' onChange={onChange} value={note.title}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} required/>
                    </div>
                </div>
                

                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      
    </div>
  )
}

export default AddNote
