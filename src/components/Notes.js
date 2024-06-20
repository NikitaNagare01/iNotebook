import {useContext, useEffect, useRef, useState} from 'react'
import contextValue from '../Context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  let navigate= useNavigate();
    
  const context = useContext(contextValue);
  const {notes, getNotes, editNote}=context;

  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate('/login');
    }
     // eslint-disable-next-line
  },[])

  const ref=useRef(null);
  const refclose=useRef(null);

  const updatenote =(note)=>{
    ref.current.click();
    setnote({id:note._id ,etitle:note.title, edescription:note.description, etag:note.tag})
  }

  
  const [note, setnote] = useState({id:"" ,etitle : "", edescription : "", etag : "default"});

  const handleClick=(e)=>{
      refclose.current.click();
      editNote(note.id, note.etitle, note.edescription, note.etag);
      props.showAlert("Updated successfully", "success");
  }

  const onChange=(e)=>{
      setnote({...note, [e.target.name] : e.target.value});
  }

  return (
    <div className='row my-3'>
            <AddNote/>


                        
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>

            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">


                  <form className='container my-3'>
                          <div className="mb-3 row">
                              <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                              <div className="col-sm-10">
                                  <input type="text"  className="form-control" id="etitle" name='etitle' onChange={onChange} value={note.etitle} minLength={5} required/>
                              </div>
                          </div>
                          <div className="mb-3 row">
                              <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                              <div className="col-sm-10">
                                  <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription} minLength={5} required/>
                              </div>
                          </div>

                          <div className="mb-3 row">
                              <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
                              <div className="col-sm-10">
                                  <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} minLength={5} required/>
                              </div>
                          </div>
                          
                  </form>


                  </div>
                  <div className="modal-footer">
                    <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>



            <h2 className='container my-3'> Your Notes</h2>
              <div className="container">
                {notes.length===0 && "No notes"}
              </div>
                {notes.map((note)=>{
                    return <NoteItem key={note._id} note={note} updatenote={updatenote} showAlert={props.showAlert}/>;
                    
                })}

    </div>
  )
}

export default Notes
