function selectGenre(genre) {
  localStorage.setItem("selectedGenre", genre);
  window.location.href = "books.html";
}
const books = [
  { title: "Harry Potter", genre: "Fiction", price: 499 },
  { title: "It Ends With Us", genre: "Romance", price: 399 },
  { title: "Brief History of Time", genre: "Science", price: 349 },
  { title: "Avengers Vol 1", genre: "Comics", price: 250 },
  // Add more books
];

if (window.location.pathname.includes("books.html")) {
  const genre = localStorage.getItem("selectedGenre");
  document.getElementById("genre-heading").innerText = `Books in ${genre}`;
  
  const list = document.getElementById("bookList");
  const filtered = books.filter(b => b.genre === genre);
  
  filtered.forEach(book => {
    const div = document.createElement("div");
    div.className = "book-card";
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p>₹${book.price}</p>
      <button onclick="orderBook('${book.title}', ${book.price})">Order</button>
    `;
    list.appendChild(div);
  });
}
function orderBook(title, price) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({ title, price, date: new Date().toLocaleString() });
  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Book ordered! Check order page.");
}
if (window.location.pathname.includes("order.html")) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const container = document.getElementById("orderList");

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders yet.</p>";
  } else {
    orders.forEach(order => {
      const div = document.createElement("div");
      div.className = "order-card";
      div.innerHTML = `<strong>${order.title}</strong> - ₹${order.price} <br><small>${order.date}</small>`;
      container.appendChild(div);
    });
  }
}
