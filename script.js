
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" 

const appSettings = {
  databaseURL : "https://playground-82c14-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputEl = document.getElementById("input-el")
const btnEl = document.getElementById("btn-el")
let list = document.getElementById("shopping-list")




btnEl.addEventListener("click", function() {

  let inputValue = inputEl.value 

  
  push(shoppingListInDB, inputValue)
  inputEl.value = ""

  

})

onValue(shoppingListInDB, function(snapshot) {
  
  if(snapshot.exists()) {
  //Object.entries->making an array from an object(keys,values)
  //Object.keys->making an array from an object(keys)
  //Object.values->making an array from an object(values)
    
    let itemArray = Object.entries(snapshot.val()) 
      list.innerHTML = ""

    for(let i = 0; i < itemArray.length; i++) { 
      render(itemArray[i])
    }
  } else {
      list.innerHTML = "No items added yet..."
  }
}) 

function render(inputItems) {
  //list.innerHTML += `<li>${inputItems}</li>`
  let itemId = inputItems[0]
  let itemValue = inputItems[1]

  let itemInList = document.createElement("li")
  itemInList.textContent = itemValue

  itemInList.addEventListener("dblclick", function() {
    let exactItemLocationInDB = ref(database, `shoppingList/${itemId}`)
  
    remove(exactItemLocationInDB)
  })

  list.append(itemInList)

}
/*

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-82c14-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const userEl = document.getElementById("user-el");
const inputEl = document.getElementById("input-el");
const btnEl = document.getElementById("btn-el");
const list = document.getElementById("shopping-list");

let shoppingListInDB;

// Update the reference whenever the username changes
userEl.addEventListener("input", function () {
  const username = userEl.value.trim();
  if (username) {
    shoppingListInDB = ref(database, `${username}/shoppingList`);
    updateList();
  } else {
    list.innerHTML = "Please enter your name.";
  }
});

btnEl.addEventListener("click", function () {
  const inputValue = inputEl.value.trim();
  const username = userEl.value.trim();
  if (username) {
    if (inputValue) {
      push(shoppingListInDB, inputValue);
      inputEl.value = "";
    } else {
      alert("Please enter an item.");
    }
  } else {
    alert("Please enter your name first.");
  }
});

function updateList() {
  onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
      const itemArray = Object.entries(snapshot.val());
      list.innerHTML = "";
      for (let i = 0; i < itemArray.length; i++) {
        const [id, value] = itemArray[i];
        render(id, value);
      }
    } else {
      list.innerHTML = "No items added yet...";
    }
  });
}

function render(id, value) {
  const itemInList = document.createElement("li");
  itemInList.textContent = value;

  itemInList.addEventListener("dblclick", function () {
    const exactItemLocationInDB = ref(database, `${userEl.value.trim()}/shoppingList/${id}`);
    remove(exactItemLocationInDB);
  });

  list.append(itemInList);
}

*/