import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Note from "../components/Note.jsx";
import CreateArea from "../components/CreateArea.jsx";
import { BASE_URL } from "../context/helper.js";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const getNotes = async () => {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/notes/getnotes?page=${page}`,
      { withCredentials: true }
    );
    setNotes(data);
    console.log(data[0]._id);
  };

  const addNote = async (newNote) => {
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/notes/postnote`,
      newNote,
      { withCredentials: true }
    );
    console.log(data);
    setNotes((pre) => {
      return [...pre, data];
    });
  };

  const deleteNote = async (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note, index) => note._id !== id);
    });
    const data = await axios.delete(
      `${BASE_URL}/api/v1/notes/deletenote/${id}`,
      {
        withCredentials: true,
      }
    );
    alert("Done");
  };
  const nextPage = () => {
    setPage(page + 1);
    console.log(page);
  };
  const prevPage = () => {
    if (page == 1) {
      setPage(1);
    } else {
      setPage(page - 1);
      console.log(page);
    }
  };
  useEffect(() => {
    getNotes();
  }, [page]);
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {/* onClick={setPage((pre) => pre + 1)} */}
      <div className="page">
        <button className="next" onClick={prevPage}>
          Back
        </button>
        <h4 className="h4">{page}</h4>
        <button className="next" onClick={nextPage}>
          Next
        </button>
      </div>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
};

export default Home;
