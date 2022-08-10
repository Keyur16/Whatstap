import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props)=>{

    const host ="http://localhost:5000"

    const notesInitial = [
        // {
        //   "_id": "62aeca16ddd22bdf7e58a385",
        //   "user": "62adce2fbeac360c5263c031",
        //   "title": "My Car",
        //   "description": "This is red color jaguar XE ",
        //   "tag": "racing",
        //   "date": "2022-06-19T07:02:46.696Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "62af21c4a847e6a8aa0c7d13",
        //   "user": "62adce2fbeac360c5263c031",
        //   "title": "My Book",
        //   "description": "This is HC Verma - Physics ",
        //   "tag": "Good Book",
        //   "date": "2022-06-19T13:16:52.972Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "62b06cb29cdd09f3d5591b65",
        //   "user": "62adce2fbeac360c5263c031",
        //   "title": "dhjd",
        //   "description": "djhsgs",
        //   "tag": "sggjsjs",
        //   "date": "2022-06-20T12:48:50.324Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "62b06cfa9cdd09f3d5591b67",
        //   "user": "62adce2fbeac360c5263c031",
        //   "title": "Akshay jack ",
        //   "description": "Good Boy",
        //   "tag": "MC",
        //   "date": "2022-06-20T12:50:02.248Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "62b06e5d9cdd09f3d5591b69",
        //   "user": "62adce2fbeac360c5263c031",
        //   "title": "Bike",
        //   "description": "Honda abc",
        //   "tag": "fast",
        //   "date": "2022-06-20T12:55:57.209Z",
        //   "__v": 0
        // }
      ]

      const [notes, setNotes] = useState(notesInitial);

      //Get all notes
      const getNotes = async ()=>{
        
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', 
            //mode: 'cors',   
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
              
            },           
          });          
          const json = await response.json();
          //console.log(json)
          setNotes(json)
        
      }



      //Add a new note
      const addNote = async (title, description, tag)=>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', 
            //mode: 'cors',   
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
              
            },           
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
          });
          const json = await response.json();
        


        //Logic to add in client side
        console.log("adding a new note")
        // const note = {
        //     "_id": "62af21c4a847e6a8aa0c7d13",
        //     "user": "62adce2fbeac360c5263c031",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2022-06-19T13:16:52.972Z",
        //     "__v": 0
        //   };

        const note = json;
        setNotes(notes.concat(note));
      }


      //Delete a note
      const deleteNote = async (id)=>{
        //API call

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
                
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
              
            },
          });
          const json = await response.json();
          console.log(json)

        //Logic to delete in client side
        console.log("deleting a note with id" + id);
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes);

    }


      //Update a note
      const editNote = async (id, title, description, tag)=>{

        //TODO: Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
                
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
              
            },           
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
          });
          const json = await response.json();
          console.log(json);

        
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client side
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];

            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
            
        }
        setNotes(newNotes);

    }

    return (

        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;