import { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);
  const userId = localStorage.getItem("userId"); // Assuming userId is stored after login

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  const handleIssue = async (bookId) => {
    try {
      await axios.post("http://localhost:5000/api/books/issue", {
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
    <div>
      <h2>Library Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} (Available: {book.availableCopies})
            <button
              onClick={() => handleIssue(book._id)}
              disabled={book.availableCopies <= 0}
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
