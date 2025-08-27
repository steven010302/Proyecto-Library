// almacenar los datos (libros)
const Books = [
  CreateBook("Aliento de dragon", "Malena Salazar", "Fantasia", GenerateISBN()),
  CreateBook("Satanas", "Mario Mendoza", "Novela", GenerateISBN()),
  CreateBook("Historias Extraordinarias", "Edgar Allan Poe", "Terror", GenerateISBN()),
];

// almacena los libros prestados
const BorrowedBooks = new Map();

// crear el isbn aleatoriamente

function GenerateISBN(){
  return `${Math.floor(Math.random()*100)+900}-${Math.floor(Math.random()*10)+90}-${Math.floor(Math.random()*1000)+9000}-${Math.floor(Math.random()*120)+480}-${Math.floor(Math.random()*10)}`
}

// funcion para crear un libro 

function CreateBook(Title, Author, Genre, ISBN){
  return {
    ID : Date.now() + Math.floor(Math.random()*1000),
    Title,
    Author,
    Genre,
    ISBN,
    IsAvailable : true,
    BorrowedBy : null,
    BorrowedAt : null,
    DueDate : null,
    CreatedAt : new Date()
  };
}

// agregar un libro a la biblioteca

function AddBookToLibrary(BooksArray, Title, Author, Genre, ISBN){
  const Book =  CreateBook(Title, Author, Genre, ISBN)
  BooksArray.push(Book)
  return Book
};

// Eliminar un libro de la biblioteca

function RemoveBookFromLibrary(BooksArray, ID){
  const Index =  BooksArray.findIndex(Book => Book.ID ===ID)
  if (Index != -1){
    return BooksArray.splice(Index, 1)[0];
  }
  
  return null
};

// prestar un libro

function BorrowBook(BooksArray, BorrowedBooks, BookID, User, Days = 30){
  const Book = BooksArray.find(Book => Book.ID === BookID)
  if (!Book){
    return{Success : false, Message: "libro no encontrado", Book : null}
  };
  if (!Book.IsAvailable){
    return {Success: false, Message : "este libro ya ha sido prestado", Book}
  }

  Book.IsAvailable = false
  Book.BorrowedBy = User
  Book.BorrowedAt = new Date()
  Book.DueDate = new Date(Date.now()+ Days * 24 * 60 * 60 * 1000)
  BorrowedBooks.set(BookID, Book)

  return {
    Success : true,
    Message : `El libro ha sido prestado a ${User}`,
    Book,
    DueDate : Book.DueDate
  };
}

// devolver libro

function ReturnBook(BorrowedBooks, BookID, DebtDate = 0.5){
  const Book = BorrowedBooks.get(BookID)
  if(!Book){
    return {Success : false, Message : "este libro no pertenece a la biblioteca" , Debt : 0}
  }
  const Debt = CalculateDebt(Book.DueDate, DebtRate);
  Book.IsAvailable = true;
  Book.BorrowedBy = null;
  Book.BorrowedAt = null;
  Book.DueDate = null;
  BorrowedBooks.delete(BookID);

  return {
    Success: true,
    Message: "Libro devuelto",
    Debt: Debt
  };
}

// Calcular multa por retraso
const CalculateDebt = (DueDate, DebtRate = 0.5) => {
  const Now = new Date();
  if (Now > DueDate) {
    const DaysLate = Math.ceil((Now - DueDate) / (1000 * 60 * 60 * 24));
    return DaysLate * DebtRate;
  }
  return 0;
};

// Buscar libros por texto
function SearchBooks(BooksArray, Criteria) {
  const Lower = Criteria.toLowerCase();
  return BooksArray.filter(Book =>
    Book.Title.toLowerCase().includes(Lower) ||
    Book.Author.toLowerCase().includes(Lower) ||
    Book.Genre.toLowerCase().includes(Lower)
  );
}

// Obtener libros por género
function GetBooksByGenre(BooksArray, Genre) {
  return BooksArray.filter(Book => Book.Genre.toLowerCase() === Genre.toLowerCase());
}

// Obtener libros vencidos
function GetOverdueBooks(BorrowedBooks, DebtRate = 0.5) {
  const Now = new Date();
  const Overdue = [];
  BorrowedBooks.forEach(Book => {
    if (Book.DueDate < Now) {
      Overdue.push({
        Book,
        Debt: CalculateDebt(Book.DueDate, DebtRate)
      });
    }
  });
  return Overdue;
}

// Generar reporte de la biblioteca
function GenerateLibraryReport(BooksArray, BorrowedBooks) {
  const TotalBooks = BooksArray.length;
  const BorrowedCount = BorrowedBooks.size;
  const AvailableCount = BooksArray.filter(Book => Book.IsAvailable).length;
  const OverdueBooks = GetOverdueBooks(BorrowedBooks);
  const TotalDebts = OverdueBooks.reduce((Sum, Entry) => Sum + Entry.Debt, 0);

  return {
    totalBooks: TotalBooks,
    borrowedBooks: BorrowedCount,
    availableBooks: AvailableCount,
    overdueBooks: OverdueBooks.length,
    totalDebts: TotalDebts
  };
}


console.log("Biblioteca cargada con 3 libros:");
console.table(Books);







