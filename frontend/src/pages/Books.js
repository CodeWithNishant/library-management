import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css"; // Importing the CSS file

const Books = () => {
  const [books, setBooks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(`http://localhost:5000/api/books`);
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  const handleIssue = async (bookId) => {
    try {
      await axios.post(`http://localhost:5000/api/books/issue/${bookId}`, {
        userId,
        bookId,
      });
      alert("Book issued successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to issue book");
    }
  };

  return (
    <div className="books-container">
      <h2 className="books-title">Library Books</h2>
      <ul className="books-list">
        {books.map((book) => (
          <li key={book._id} className="book-card">
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <p className="availability"></p>
            </div>
            <button
              className="issue-button"
              onClick={() => handleIssue(book._id)}
            >
              Issue Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
