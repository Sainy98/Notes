import React, { useState, useEffect } from 'react';

const NoteWeb = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');
    const [previewNote, setPreviewNote] = useState('');
    const [clicked, setClicked] = useState('Add note'); //btn name

    useEffect(() => {
        // Load notes from local storage on component mount
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, []);

    useEffect(() => {
        // Save notes to local storage whenever the notes state changes
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const noteAdded = () => {
        setClicked('Add Note');
        // alert('mouse enetered');
    };

    const addNote = () => {
        if (currentNote.trim() !== '') {
            const newNotes = [...notes];
            // Add the new note to the copy
            newNotes.push(currentNote);
            // Update the state with the new array
            setNotes(newNotes);
            setCurrentNote('');
            // Set the button text

            setClicked('Note Added');
        }

    };

    const close = () => {
        setPreviewNote('');
    };

    const deleteNote = (index) => {
        const isConfirmed = window.confirm("Are you sure you want delete this note?")
        if (isConfirmed) {
            const updatedNotes = [...notes];
            updatedNotes.splice(index, 1);
            setNotes(updatedNotes);
            setPreviewNote('');
        }
    };

    const deleteFromEdit = (index) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
        setPreviewNote('');
    }

    const previewNoteHandler = (note) => {
        setPreviewNote(note);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const editNote = (index) => {
        setCurrentNote(notes[index]);
        deleteFromEdit(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="note" >

            <div className="note-input" >
                <textarea
                    placeholder="Write your note here..."
                    value={currentNote}
                    onClick={noteAdded}
                    onChange={(e) => setCurrentNote(e.target.value)}
                ></textarea>
                <br />
                <button className='add-note' onClick={addNote}>{clicked}</button>
            </div>
            <div className="note-list" >
                <h2> Saved Notes</h2>
                <ul className='ul'>
                    {notes.map((note, index) => (
                        <li key={index} className='ListItem' >

                            <h3>{(note.charAt(0).toUpperCase() + note.slice(1)).substring(0, 10) + "..."}</h3>
                            <hr></hr>
                            <p>{note.substring(0, 90)}</p>
                            <br />

                            <div className='btn-container'>
                                <button onClick={() => deleteNote(index)} className='btn'>
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button onClick={() => previewNoteHandler(note)} className='btn'>
                                    <i className="far fa-eye"></i> </button>

                                <button onClick={() => editNote(index)} className='btn'>
                                    <i className="fas fa-edit"></i></button>
                            </div>
                        </li>


                    ))}
                </ul>

            </div>
            {previewNote && (
                <div className="note-preview">

                    <i onClick={close} className="fas fa-times close" ></i>

                    <h2>Note Preview</h2>
                    <p className='preview-p'>{previewNote}</p>
                </div>
            )}
        </div>
    );
};

export default NoteWeb;