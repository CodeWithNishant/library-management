import { useEffect, useState } from "react";
import axios from "axios";

const ReturnBook = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/user/${userId}/issued-books`
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
      const fineAmount = response.data.fineAmount;

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
    <div>
      <h2>Return Issued Books</h2>
      <ul>
        {issuedBooks.map((book) => (
          <li key={book.bookId}>
            {book.title} by {book.author} <br />
            {book.fineAmount > 0 ? (
              <>
                <p style={{ color: "red" }}>Fine: ₹{book.fineAmount}</p>
                <button onClick={() => handlePayFine(book.bookId)}>
                  Pay Fine
                </button>
              </>
            ) : (
              <button onClick={() => handleReturn(book.bookId)}>
                Return Book
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReturnBook;
