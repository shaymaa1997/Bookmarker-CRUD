var siteNameInput = document.getElementById("bookmarkName");
var siteURLInput = document.getElementById("bookmarkURL");
var bookmarks;

if (localStorage.getItem("bookmarks") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmark();
}
else { bookmarks = []; };

function validateName() {
  var regex = /^\w{3,}(\s+\w+)*$/;
  if (regex.test(siteNameInput.value) == true) {
    document.getElementById("bookmarkName").classList.add('is-valid');
    return true;
  }
  else {
    document.getElementById("bookmarkName").classList.add('is-invalid');
    return false;
  }

};

function typeData(){
  document.getElementById("bookmarkName").classList.remove('is-valid', 'is-invalid');
  document.getElementById("bookmarkURL").classList.remove('is-valid', 'is-invalid');
}

function validateUrl() {
  var regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  if (regex.test(siteURLInput.value) == true) {
    document.getElementById("bookmarkURL").classList.add('is-valid');
    return true;
  }
  else{document.getElementById("bookmarkURL").classList.add('is-invalid');
  return false};
};


/*function addWebsite*/
function addWebsite() {
  if (validateName() == true && validateUrl() == true) {
    var bookmark = {
      siteName: siteNameInput.value,
      siteURL: siteURLInput.value,
    };

    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    clearInput();
    displayBookmark();
    document.getElementById("alert").classList.replace("d-block", "d-none");
  }
  else {
    document.getElementById("alert").classList.replace("d-none", "d-block");
  }
}

/*ClearInput Function*/
function clearInput() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

/*Display Function */
function displayBookmark() {
  var BookmarkGroup = "";
  for (var i = 0; i < bookmarks.length; i++) {
    BookmarkGroup += `
    <tr>
                <td>${i + 1}</td>
                <td>${bookmarks[i].siteName}</td>              
                <td>
                  <button  onclick="visitWebsite(${i})" class="btn btn-visit" >
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button onclick="deleteBookmark(${i})" class="btn btn-delete pe-2" >
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  };
  document.getElementById("tableContent").innerHTML = BookmarkGroup;
}

/*Delete Function */
function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  displayBookmark();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}


/*Visit Function*/
function visitWebsite(index) {
  window.open(bookmarks[index].siteURL);
}

/*Close Modal Function */
function closeModal() {
  document.getElementById("alert").classList.replace("d-block", "d-none");
}