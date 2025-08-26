 
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


