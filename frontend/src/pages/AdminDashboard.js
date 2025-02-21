import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!title || !author || !category) {
      alert("Please enter title, author, and category!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/books/add", {
        title,
        author,
        category,
      });
      alert("Book added successfully!");
      setTitle("");
      setAuthor("");
      setCategory("");
      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📚 Admin Dashboard</h1>

      {/* Add New Book Form */}
      <div style={styles.card}>
        <h2>➕ Add a New Book</h2>
        <form onSubmit={handleAddBook} style={styles.form}>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>
            Add Book
          </button>
        </form>
      </div>

      {/* Book List */}
      <div style={styles.card}>
        <h2>📖 Books</h2>
        <ul style={styles.list}>
          {books.map((book) => (
            <li key={book._id} style={styles.listItem}>
              <span>
                {book.title} - {book.author}
              </span>
              <button
                style={styles.deleteButton}
                onClick={() => handleDeleteBook(book._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* User List */}
      <div style={styles.card}>
        <h2>👥 Users</h2>
        <ul style={styles.list}>
          {users.map((user) => (
            <li key={user._id} style={styles.listItem}>
              <span>
                {user.name} - {user.email}
              </span>
              <button
                style={styles.deleteButton}
                onClick={() => handleDeleteUser(user._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Styles Object
const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  card: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "10px",
    background: "#28a745",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "white",
    borderBottom: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "5px",
  },
  deleteButton: {
    padding: "5px 10px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminDashboard;
