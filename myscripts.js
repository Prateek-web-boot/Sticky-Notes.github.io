window.onload = function () {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
      /** Your code here. **/
      alert('HOW TO GET STARTED --->\n\nThis is a Sticky Note Web app where you can create your important notes and also delete them.\n\n This web app is installable on your mobile and computer, you just need to Follow these steps:-\n1. Click on three vertical dots on top right corner of browser.\n2. Click on Add To Home screen Option.\n3. Select ADD option.\nBOOM! YOU JUST INSTALLED THE APPICATION.\n\nThis web app also has a feature of offline operation i.e(no internet usage) and your data always remain saved, you can modify as per your needs.\n\n-Prateek Gupta');

      localStorage.setItem("hasCodeRunBefore", true);
  }
}

if ("serviceWorker" in navigator) {
    // register service worker
    navigator.serviceWorker.register("service-worker.js");
  }
  
  var itemList = document.getElementById("notes");
  
  itemList.addEventListener("click", removeItem);
  
  let count = Number(window.localStorage.getItem("count"));
  if (!count) {
    window.localStorage.setItem("count", "0");
  }
  

  
  let createNote = (noteTitle, noteBody, dateStamp) => {
    if (count > -1) {
      document.getElementById("no-notes").className = "hidden";
    }
  
    var li = document.createElement("li");
    var a = document.createElement("a");
    var h2 = document.createElement("h2");
    var p = document.createElement("p");
    var h6 = document.createElement("h6");
    var ul = document.getElementById("notes");
  
    let xButton = document.createElement("button");
    xButton.classList.add("delete");
    h6.classList.add("date");
    let xText = document.createTextNode("X");
    let h2TN = document.createTextNode(noteTitle);
    let pTN = document.createTextNode(noteBody);
    let h6TN = document.createTextNode(dateStamp);
  
    h2.appendChild(h2TN);
    p.appendChild(pTN);
    xButton.appendChild(xText);
    h6.appendChild(h6TN);
  
    a.appendChild(h2);
    a.appendChild(xButton);
    a.appendChild(p);
    a.appendChild(h6);
    a.setAttribute("href", "#");
  
    li.appendChild(a);
    ul.appendChild(li);
  };
  
  let createNoteFromInput = (e) => {
    e.preventDefault();
    var noteTitle = document.getElementById("new-note-title-input").value;
    var noteBody = document.getElementById("new-note-body-input").value;


    var collect = new Date();
    var month = collect.getMonth() + 1;
    var date = collect.getDate();
    var year = collect.getFullYear();
    var dateStamp = `${date}/${month}/${year}`;


  
    document.getElementById("new-note-title-input").value = "";
    document.getElementById("new-note-body-input").value = "";
  
    if (!noteTitle || !noteBody) {
      alert("Both Title and body of the note must be provided");
      return;
    }

    // if (noteTitle === "date") 
    // {
    //   alert('you can\'t create a note title named -> (date)');
    // }
    count += 1;
    window.localStorage.setItem("count", count);
    window.localStorage.setItem("date", dateStamp);  

    // while(window.localStorage.key(date)) {
    //   date = date + " - 1";
    // }
  
    while (window.localStorage.getItem(noteTitle)) {
      noteTitle = noteTitle + " *";
    }
    window.localStorage.setItem(noteTitle, noteBody);
  
    createNote(noteTitle, noteBody, dateStamp);
  };
  
  function removeItem(e) {
    //console.log('2');
    if (e.target.classList.contains("delete")) {
      
      if (
        confirm(
          'Are you sure to delete the "' +
            e.target.previousElementSibling.innerText +
            '" note?'
        )
      ) {
        //grab the parent
        // console.log(e.target.previousSibling.data);
        var li = e.target.parentElement.parentElement;
  
        itemList.removeChild(li);
        count -= 1;
        window.localStorage.setItem("count", count);
        window.localStorage.removeItem(e.target.previousElementSibling .innerText);

        if (count == 0) {

          window.localStorage.removeItem("date");
        }
        // window.localStorage.removeItem("date");

        if (count < 1) {
          document.getElementById("no-notes").className = "";
        }
      }
    }
  }
  
  for (i = 0; i < count +3; i++) {
    // console.log(window.localStorage.key(i));
    let noteTitle = window.localStorage.key(i);
    let noteBody = window.localStorage.getItem(noteTitle);
    let dateStamp = window.localStorage.getItem("date");
    if (noteTitle !== "count" && noteTitle && noteTitle !== "date" && noteTitle !== "randid") {
      createNote(noteTitle, noteBody, dateStamp);
    }
  }
  
  document
    .getElementById("inputForm")
    .addEventListener("submit", createNoteFromInput, false);
  
