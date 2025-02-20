import { useEffect, useState } from "react";
import axios from "axios";

const ReturnBook = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/books/issued/${userId}`
      );
      setIssuedBooks(res.data);
    };
    fetchIssuedBooks();
  }, [userId]);

  const handleReturn = async (bookId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/books/return",
        { userId, bookId }
      );
      const fineAmount = response.data.fine;

      if (fineAmount > 0) {
        alert(
          `You have a fine of ₹${fineAmount}. Please pay before proceeding.`
        );
      } else {
        alert("Book returned successfully!");
        window.location.reload();
      }
    } catch (error) {
      alert("Failed to return book");
    }
  };

  const handlePayFine = async (bookId) => {
    try {
      await axios.post("http://localhost:5000/api/books/pay-fine", {
        userId,
        bookId,
      });
      alert("Fine paid successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to pay fine");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Return Issued Books</h2>
      <ul style={styles.bookList}>
        {issuedBooks.map((book) => (
          <li key={book._id} style={styles.bookItem}>
            <div style={styles.bookDetails}>
              <strong>{book.title}</strong> <br />
              <span style={styles.author}>by {book.author}</span>
            </div>
            {book.fine > 0 ? (
              <div style={styles.fineSection}>
                <p style={styles.fineText}>Fine: ₹{book.fine}</p>
                <button
                  style={styles.fineButton}
                  onClick={() => handlePayFine(book._id)}
                >
                  Pay Fine
                </button>
              </div>
            ) : (
              <button
                style={styles.returnButton}
                onClick={() => handleReturn(book._id)}
              >
                Return Book
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline styles for better UI
const styles = {
  container: {
    maxWidth: "600px",
    marginTop: "50px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  bookList: {
    listStyle: "none",
    padding: 0,
  },
  bookItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
  },
  bookDetails: {
    textAlign: "left",
  },
  author: {
    color: "#666",
    fontSize: "14px",
  },
  fineSection: {
    textAlign: "right",
  },
  fineText: {
    color: "red",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  fineButton: {
    backgroundColor: "#ff5e5e",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  returnButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ReturnBook;
