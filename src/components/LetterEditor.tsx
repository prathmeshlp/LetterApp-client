import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Letter } from "../types/letter";

interface LetterEditorProps {
  selectedLetter: Letter | null;
  setLetters: React.Dispatch<React.SetStateAction<Letter[]>>;
  setSelectedLetter: React.Dispatch<React.SetStateAction<Letter | null>>;
}

const LetterEditor: React.FC<LetterEditorProps> = ({
  selectedLetter,
  setLetters,
  setSelectedLetter,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (selectedLetter) {
      setTitle(selectedLetter.title);
      setContent(selectedLetter.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedLetter]);

  const handleSave = async () => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }
    try {
      if (selectedLetter) {
        const response = await axios.put(
          `https://letterappbackend.vercel.app/letters/edit/${selectedLetter._id}`,
          { title, content },
          { withCredentials: true }
        );
        setLetters((prev) =>
          prev.map((l) => (l._id === selectedLetter._id ? response.data : l))
        );
        setSelectedLetter(response.data);
      } else {
        const response = await axios.post(
          "https://letterappbackend.vercel.app/letters/create",
          { title, content },
          { withCredentials: true }
        );
        setLetters((prev) => [...prev, response.data]);
        setSelectedLetter(response.data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save letter");
    }
  };

  const handleSaveToDrive = async () => {
    if (!selectedLetter) {
      alert("Save the letter first");
      return;
    }
    try {
      const response = await axios.post(
        `https://letterappbackend.vercel.app/letters/save-to-drive/${selectedLetter._id}`,
        {},
        { withCredentials: true }
      );
      setLetters((prev) =>
        prev.map((l) =>
          l._id === selectedLetter._id
            ? { ...l, googleDriveId: response.data.googleDriveId }
            : l
        )
      );
      setSelectedLetter((prev) =>
        prev ? { ...prev, googleDriveId: response.data.googleDriveId } : null
      );
      alert(
        `Letter saved to Google Drive, View it here: https://docs.google.com/document/d/${response.data.googleDriveId}`
      );
    } catch (err) {
      console.error(err);
      alert("Failed to save to Google Drive");
    }
  };

  const handleNewLetter = () => {
    setSelectedLetter(null);
    setTitle("");
    setContent("");
  };

  const handleFetchFromDrive = async () => {
    if (!selectedLetter || !selectedLetter.googleDriveId) {
      alert("Select a letter saved to Google Drive first");
      return;
    }
    try {
      const response = await axios.get(
        `https://letterappbackend.vercel.app/letters/fetch-from-drive/${selectedLetter._id}`,
        { withCredentials: true }
      );
      console.log(response, "response");
      setTitle(response.data.title);
      setContent(response.data.content);
      alert("Fetched from Google Drive successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to fetch from Google Drive");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Letter Title"
        className="w-full p-2 mb-4 border rounded"
      />
      <ReactQuill value={content} onChange={setContent} className="h-64" />
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {selectedLetter ? "Update" : "Save"}
        </button>
        <button
          onClick={handleSaveToDrive}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={!selectedLetter}
        >
          Save to Drive
        </button>
        <button
          onClick={handleFetchFromDrive}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          disabled={!selectedLetter || !selectedLetter.googleDriveId}
        >
          Fetch from Drive
        </button>
        <button
          onClick={handleNewLetter}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          New Letter
        </button>
      </div>
    </div>
  );
};

export default LetterEditor;
