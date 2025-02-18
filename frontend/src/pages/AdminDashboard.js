import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const handleDeleteBook = async (bookId) => {
    await axios.delete(`http://localhost:5000/api/books/${bookId}`);
    fetchBooks();
  };

  const handleDeleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/api/users/${userId}`);
    fetchUsers();
  };

  return (
    <div>
      <h1>📚 Admin Dashboard</h1>

      <h2>📖 Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author}
            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>👥 Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => handleDeleteUser(user._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
