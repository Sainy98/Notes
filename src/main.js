import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteWeb = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState({ text: '', dateTime: '' });
    const [previewNote, setPreviewNote] = useState('');
    const [clicked, setClicked] = useState('Add note');

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const noteAdded = () => {
        setClicked('Add Note');
    };

    const addNote = () => {
        if (currentNote.text.trim() !== '') {
            const now = new Date();
            const formattedDateTime = now.toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });

            const newNote = {
                ...currentNote,
                dateTime: formattedDateTime,
            };

            setNotes([...notes, newNote]);
            setCurrentNote({ text: '', dateTime: '' });
            setClicked('Note Added');
            setTimeout(() => {
                setClicked('Add Note');
            }, 2000); // Resets back to "Add Note" after 2 seconds
        }
    };

    const close = () => {
        setPreviewNote('');
    };

    const deleteNote = (index) => {
        const isConfirmed = window.confirm("Are you sure you want delete this note?");
        if (isConfirmed) {
            const updatedNotes = [...notes];
            updatedNotes.splice(index, 1);
            setNotes(updatedNotes);
            setPreviewNote('');
        }
    };

    const previewNoteHandler = (note) => {
        setPreviewNote(note);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const editNote = (index) => {
        setCurrentNote(notes[index]);
        // Remove the note from the list without confirmation
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
        // Delete the note after setting it in the editor
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="note">
            <div className="note-input">

                <ReactQuill className='textarea'
                    placeholder="Write your note here..."
                    value={currentNote.text}
                    onClick={noteAdded}
                    onChange={(value) => setCurrentNote({ ...currentNote, text: value })}
                />

                <br />
                <button className='add-note' onClick={addNote}>{clicked}</button>
            </div>
            <div className="note-list">
                <h2>Saved Notes</h2>
                <ul className='ul'>
                    {notes.map((note, index) => (
                        <li key={index} className='ListItem'>

                            <h2>
                                {note.text.replace(/<\/?[^>]+(>|$)/g, '').charAt(0).toUpperCase() +
                                    note.text.replace(/<\/?[^>]+(>|$)/g, '').slice(1).substring(0, 20) + "..."}
                            </h2>
                            <hr />
                            <small>{note.dateTime}</small>
                            <div dangerouslySetInnerHTML={{ __html: note.text.substring(0, 90) }}></div>
                            <br />
                            <div className='btn-container'>
                                <button onClick={() => deleteNote(index)} className='btn'>
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button onClick={() => previewNoteHandler(note)} className='btn'>
                                    <i className="far fa-eye"></i>
                                </button>
                                <button onClick={() => editNote(index)} className='btn'>
                                    <i className="fas fa-edit"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {previewNote && (
                <div className="note-preview">
                    <div className='note-preview-container'>
                        <h2>Note Preview</h2>
                        <small>{previewNote.dateTime}</small>
                        <div className='preview-p' dangerouslySetInnerHTML={{ __html: previewNote.text }}></div>
                    </div>
                    <button onClick={close} className='close'>Close</button>
                </div>
            )}
        </div>
    );
};

export default NoteWeb;
