 
// almacenar los datos (libros)
const Books = [
  CreateBook("Aliento de dragon", "Malena Salazar", "Fantasia", genetateISBN()),
  CreateBook("Satanas", "Mario Mendoza", "Novela", genetateISBN()),
  CreateBook("Historias Extraoridinarias", "Edgar Allan Poe", "Terror", genetateISBN()),
];

// almacena los libros prestados
const BorrowedBooks = new Map();

// crear el isbn aleatoriamente

function GenerateISBN(){
  return `${Math.floor(Math.random()*100)+900}-${Math.floor(Math.random()*10)+90}-${Math.floor(Math.random()*1000)+9000}-${Math.floor(Math.random()*120)+480}-${Math.floor(Math.random()*10)}-`
}

// funcion para crear un libro 

function CreateBook(Title, Author, Genere, ISBN){
  return {
    ID : Date.now() + math.floor(math.random()*1000), // importamos algunas funciones de math para evitar duplicados
    Title,
    Author,
    Genere,
    ISBN,
    Is_Aviable : true,
    BorrowedBy : null,
    BorrowedAt : null,
    DueDate : null,
    CreatedAt : new Date()
  };
}

// agregar un libro a la biblioteca

function AddBookToLibrary(){
  const Book =  CreateBook(Title, Author, Genere, ISBN)
  BooksArray.push(Book)
  return Book
};

// Eliminar un libro de la biblioteca

function RemoveBookFromLibrary(BooksArray, ID){
  const Index =  BooksArray.findIndex(Books => Books.ID ===ID)
  if (Index != -1){
    return BooksArray.splice(index , 1)[0]
  };
  
  return null
};

// prestar un libro

function BorrowBook(BooksArray, BorrowedBooks, BookID, User, Days = 30){
  if (!Book){
    return{Success : false, Message: "libro no encontrado", Book : null}
  };
  if (!Book.Is_Aviable){
    return {Success: false, Message : "este libro ya ha sido prestado", Book}
  }
}

Book.Is_Aviable = false
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

// devolver libro

function ReturnBook(BooksArray, BorrowedBooks, BookID, DebtDebt = 0.5){
  const Book = BorrowedBooks.get(BookID)
  if(!Book){
    return {Success : false, Message : "este libro no pertenece a la biblioteca" , Debt : 0}
  const Debt = CalculateDebt(Book.DueDate, DebtRate);
  Book.Is_Available = true;
  Book.BorrowedBy = null;
  Book.BorrowedAt = null;
  Book.DueDate = null;
  BorrowedBooks.delete(BookID);

  return {
    success: true,
    message: "Libro devuelto",
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
}






