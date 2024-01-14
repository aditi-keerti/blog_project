const titlep= document.getElementById("n-title")
const genrep= document.getElementById("n-genre")
const authorp= document.getElementById("n-author")


const addNoteDiv = document.getElementById("add-note");

addNoteDiv.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("https://agreeable-khakis-dog.cyclic.app/blogs/add", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            title: titlep.value,
            genre: genrep.value,
            writer: authorp.value
        }),
    })
    .then((response) => {
        if (!response.ok) {
            window.alert("you are not authorized");
            throw new Error(`${response.statusText}`);
        }

        return response.json();
    })
    .then((data) => {
        console.log(data);
        window.location.reload();
    })
    .catch((err) => {
        console.log(err.message);
    });
});

const noteList = document.getElementById("note-card-list");
function getData() {
    
  fetch("https://agreeable-khakis-dog.cyclic.app/blogs/", {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayBooks(data);
    })
    .catch((err) => console.log(err));
}

function displayBooks(data) {
  
  const books = data.books_data;

  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const title = document.createElement("h3");
    title.innerText = book.title;

    const genre = document.createElement("p");
    genre.innerText = book.genre;


    const author = document.createElement("p");
    author.innerText = book.author;

    

    const edit = document.createElement('button');
    edit.classList.add('edit-btn');
    edit.innerText = 'EDIT'
    

    const editBtn = document.createElement("button");
    editBtn.className = "btn1";
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click",(e)=>{
        console.log(book)
        e.preventDefault();
        editNotes(book);
    })

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn1";
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
        deleteNote(book._id)
    });

    bookCard.append(title, genre,author, editBtn, deleteBtn);
    

    noteList.appendChild(bookCard);
  });
}

getData();



function editNotes(book){
    
        titlep.value = book.title;

         genrep.value=book.genre;
         authorp.value=book.author;
         pub_yearp.value=book.publishing_year;
         currEdit=book;
  }
  
  submitBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      updateNote(currEdit);
  })
  async function updateNote(item){
      try{
       let res = await fetch(`https://agreeable-khakis-dog.cyclic.app/blogs/update/${item._id}`,{
          method: 'PATCH',
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body:JSON.stringify({
            
            title:titlep.value,
    
             genre: genrep.value,
             author: authorp.value,
             publishing_year: pub_yearp.value
             
           })
       })
        getData()
        window.location.reload();
        if (!res.ok) {
            window.alert("you are not authorized");
            throw new Error(`${response.statusText}`);
        }

        return response.json();
      }
      
        
    
      catch(err){
        console.log(err);
      }
  }

  function deleteNote(noteId) {
    fetch(`https://agreeable-khakis-dog.cyclic.app/blogs/delete/${noteId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            window.alert("you are not authorized");
            throw new Error(`Note deletion failed: ${response.statusText}`);
        }

        return response.json();
    })
    .then((deletedData) => {
        console.log(deletedData);

        getData();
        window.location.reload();
    })
    .catch((err) => {
        console.log(err.message);
    });
}

  
const logoutbtn = document.getElementById('logoutbtn');

logoutbtn.addEventListener('click', (e) => {

    e.preventDefault();

    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("token2");
    
    fetch('https://agreeable-khakis-dog.cyclic.app/users/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            
            'Authorization': `Bearer ${accessToken} ${refreshToken}`,
            
        },
        
    })
    .then((response) => {
        if (response.ok) {
            localStorage.removeItem("token")
            localStorage.removeItem("token2")
            return response.json();
            
        } else {
            throw new Error(`Logout failed: ${response.statusText}`);
        }
    })
    .then((result) => {
        console.log(result.msg); 
        location.href = '/index.html';
    })
    .catch((error) => {
        console.error(error);
    });
});
