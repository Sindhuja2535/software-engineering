// Genre to Books Map
const booksByGenre = {
  fiction: ["The Great Gatsby", "To Kill a Mockingbird", "1984"],
  romance: ["Pride and Prejudice", "The Notebook", "Me Before You"],
  technology: ["Clean Code", "The Pragmatic Programmer", "AI Superpowers"],
  selfhelp: ["Atomic Habits", "The Power of Now", "Deep Work"]
};

// Navigate from index to books
function goToBooks() {
  const genre = document.getElementById("genreSelect").value;
  if (genre) {
    localStorage.setItem("selectedGenre", genre);
    window.location.href = "books.html";
  } else {
    alert("Please select a genre");
  }
}

// Display books
if (window.location.pathname.includes("books.html")) {
  const genre = localStorage.getItem("selectedGenre");
  const bookListDiv = document.getElementById("bookList");

  if (genre && booksByGenre[genre]) {
    booksByGenre[genre].forEach((book) => {
      const div = document.createElement("div");
      div.innerHTML = `<p>${book}</p>
      <button onclick="orderBook('${book}')">Order</button>`;
      bookListDiv.appendChild(div);
    });
  } else {
    bookListDiv.innerHTML = "<p>No books available.</p>";
  }
}

// Order a book
function orderBook(bookName) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(bookName);
  localStorage.setItem("orders", JSON.stringify(orders));
  alert(`${bookName} added to your orders.`);
}

// Show orders
if (window.location.pathname.includes("order.html")) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const orderList = document.getElementById("orderList");

  if (orders.length === 0) {
    orderList.innerHTML = "<li>No orders yet.</li>";
  } else {
    orders.forEach((book) => {
      const li = document.createElement("li");
      li.textContent = book;
      orderList.appendChild(li);
    });
  }
}
