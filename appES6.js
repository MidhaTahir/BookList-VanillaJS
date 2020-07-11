class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookstoList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete">X</a></td>
        `;
    list.appendChild(row);
  }
  showAlert(message, className) {
    let div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    let container = document.querySelector(".container");
    let parent = document.querySelector("#book-form");
    container.insertBefore(div, parent);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove(); //target is delete we have to delete whole tr upward , td is parent and then tr so two times parentElement
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooksfromLS() {
    let ls = localStorage.getItem("books");
    let books;
    if (ls === null) books = [];
    else books = JSON.parse(ls);
    return books;
  }
  static addBookstoLS(book) {
    const books = Store.getBooksfromLS();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static displayBooks() {
    const books = Store.getBooksfromLS();
    books.forEach(function (book) {
      const ui = new UI();
      ui.addBookstoList(book);
    });
  }
  static removeBooks(target) {
    let isbn = target.parentElement.previousElementSibling.textContent;
    //we will delete from localStorage using isbn we get it using parentElement ie td then its previous sibling i-e isbn
    const books = Store.getBooksfromLS();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
        console.log(index);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//DOM load event listener (made for calling Store.displayBooks)
document.addEventListener("DOMContentLoaded", Store.displayBooks);

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
    Store.addBookstoLS(book); //add to LS
    //Since Store class have static methods it will be called directly without objects
    ui.showAlert("Book Added 📔", "success");
    ui.clearFields();
  }
});

document.getElementById("book-list").addEventListener("click", function (e) {
  e.preventDefault();
  const ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBooks(e.target);
  ui.showAlert("Book Deleted🙄", "success");
});
