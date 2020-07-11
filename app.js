function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookstoList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = function (message, className) {
  let div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  let container = document.querySelector(".container");
  let parent = document.querySelector("#book-form");
  container.insertBefore(div, parent);
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove(); //target is delete we have to delete whole tr upward , td is parent and then tr so two times parentElement
  }
};

document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();
  if (title === "" || author === "" || isbn === "")
    ui.showAlert("Please fill in all fields 👀", "error");
  else {
    ui.addBookstoList(book);
    ui.showAlert("Book Added 📔", "success");
    ui.clearFields();
  }
});

document.getElementById("book-list").addEventListener("click", function (e) {
  e.preventDefault();
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book Deleted🙄", "success");
});

/*
Learned from this small project 🧠
APPEND VS APPEND CHILD
source : https://dev.to/ibn_abubakre/append-vs-appendchild-a4m
.append accepts Node objects and DOMStrings while .appendChild accepts only Node objects
.append does not have a return value while .appendChild returns the appended Node object
.append allows you to add multiple items while appendChild allows only a single item
*/
