import React, { useState, useEffect } from 'react';

const NoteWeb = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');
    const [previewNote, setPreviewNote] = useState('');

    useEffect(() => {
        // Load notes from local storage on component mount
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, []);

    useEffect(() => {
        // Save notes to local storage whenever the notes state changes
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (currentNote.trim() !== '') {
            setNotes([...notes, currentNote]);
            setCurrentNote('');
        }
    };

    const close = () => {
        setPreviewNote('');
    };

    const deleteNote = (index) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
    };

    const previewNoteHandler = (note) => {
        setPreviewNote(note);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const editNote = (index) => {
        setCurrentNote(notes[index]);
        deleteNote(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="note" >

            <div className="note-input">
                <textarea
                    placeholder="Write your note here..."
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                ></textarea>
                <br />
                <button className='add-note' onClick={addNote}>Add Note</button>
            </div>
            <div className="note-list" >
                <h2> Saved Notes</h2>
                <ul className='ul'>
                    {notes.map((note, index) => (
                        <li key={index} className='ListItem' >

                            <h3>{(note.charAt(0).toUpperCase() + note.slice(1)).substring(0, 10) + "..."}</h3>
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
                    <button onClick={close} className='close'>
                        <i className="fas fa-times"></i>
                    </button>
                    <h2>Note Preview</h2>
                    <p>{previewNote}</p>

                </div>
            )}
        </div>
    );
};

export default NoteWeb;