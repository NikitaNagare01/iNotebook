import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{

  const host ="http://localhost:5000";
   
    const notesinitial = [
            {
              "_id": "665bff8e415c272fe0g70b041",
              "user": "665bfa81b16ed4dcb1080750",
              "title": "My title",
              "description": "Please wake up early",
              "tag": "Personal",
              "date": "2024-06-02T05:13:50.213Z",
              "__v": 0
            },
            {
              "_id": "665c0005415c272fe0h70b043",
              "user": "665bfa81b16ed4dcb1080750",
              "title": "My title",
              "description": "Please wake up early",
              "tag": "Personal",
              "date": "2024-06-02T05:15:49.143Z",
              "__v": 0
            },
            {
              "_id": "665c0005415c2v72fe070b043",
              "user": "665bfa81b16ed4dcb1080750",
              "title": "My title",
              "description": "Please wake up early",
              "tag": "Personal",
              "date": "2024-06-02T05:15:49.143Z",
              "__v": 0
            },
            {
              "_id": "665c0005415c272fe0j70b043",
              "user": "665bfa81b16ed4dcb1080750",
              "title": "My title",
              "description": "Please wake up early",
              "tag": "Personal",
              "date": "2024-06-02T05:15:49.143Z",
              "__v": 0
            },
            {
              "_id": "665c0005415c2d72fe070b043",
              "user": "665bfa81b16ed4dcb1080750",
              "title": "My title",
              "description": "Please wake up early",
              "tag": "Personal",
              "date": "2024-06-02T05:15:49.143Z",
              "__v": 0
            },
            {
              "_id": "665c0005415c272fe070tb043",
              "user": "665bfa81b16ed4dcb1080750",
              "title": "My title",
              "description": "Please wake up early",
              "tag": "Personal",
              "date": "2024-06-02T05:15:49.143Z",
              "__v": 0
            },
            {
              "_id": "665c0005415c272fje070b043",
              "user": "665bfa81b16ed4dcb1080750",
              "title": "My title",
              "description": "Please wake up early",
              "tag": "Personal",
              "date": "2024-06-02T05:15:49.143Z",
              "__v": 0
            },
            {
              "_id": "665c0005415c272fdje070b043",
              "user": "665bfa81b16ed4dcb1080750",
              "title": "My title",
              "description": "Please wake up early",
              "tag": "Personal",
              "date": "2024-06-02T05:15:49.143Z",
              "__v": 0
            },
            {
              "_id": "665c0005k415c272fe070b043",
              "user": "665bfa81b16ed4dcb1080750",
              "title": "My title",
              "description": "Please wake up early",
              "tag": "Personal",
              "date": "2024-06-02T05:15:49.143Z",
              "__v": 0
            },
            {
              "_id": "665cc0005415c272fe070b043",
              "user": "665bfa81b16ed4dcb1080750",
              "title": "My title",
              "description": "Please wake up early",
              "tag": "Personal",
              "date": "2024-06-02T05:15:49.143Z",
              "__v": 0
            }
    ]

    const [notes, setnotes]=useState(notesinitial);
    

    // GET ALL NOTES 
    const getNotes = async()=>{

      //  API CALL
      const response= await fetch(`${host}/api/notes/fetchallnotes`,{
        mothod:'GET',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setnotes(json);
    }

    //  Add a Note
    const addNote =async(title, description, tag)=>{

      // API CALL
      const response= await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body:JSON.stringify({title, description, tag})
      });

      const note =await response.json();
      setnotes(notes.concat(note));
    }

    // Delete a Note
    const deleteNote =async(id)=>{

      // API CALL
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      
      const newnote = notes.filter((note)=>{return note._id!==id});
      setnotes(newnote);
    }

    // Edit a Note
    const editNote =async(id, title, description, tag)=>{
      
      // API CALL
      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body:JSON.stringify({title, description, tag})
      });
      const json= response.json();

      const newnote= JSON.parse(JSON.stringify(notes));

      // LOGIC TO EDIT IN CLIENT
      for(let index=0; index<newnote.length; index++){
        const element = newnote[index];
        if(element._id === id){
          newnote[index].title=title;
          newnote[index].description=description;
          newnote[index].tag=tag;
          break;
        }
      }
      setnotes(newnote);
    }
    

    return(
        

        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;