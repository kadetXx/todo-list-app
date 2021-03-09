//get important DOM elements and store as variables

const newTask = document.querySelector('.add-task-input');
const submitTask = document.querySelector('.add-task-form');
const filterTasks = document.querySelector('.filter-tasks');
const taskList = document.querySelector('.task-list');
const clearBtn = document.querySelector('.clear-all-button');

//add all event listeners as a function

function callAllEvents() {

  //call get input, create li and apppend function
  submitTask.addEventListener('submit', addNewTask);

  //call remove task event listener
  taskList.addEventListener('click', removeTask);

  //call filter function
  filterTasks.addEventListener('input', showFilterResults);

  //call clear button function
  clearBtn.addEventListener('click', clearAllTasks);

  //call reload event
  document.addEventListener('DOMContentLoaded', collectAndDisplay);
}

//call event listener function

callAllEvents();

//get input data and create an li element with it then add to ul

function addNewTask(e) {
  const isEmpty = str => !str.trim.length(); //check for empty spaces

  if (newTask.value === '') {
    alert('Please input a task');
  } else if(isEmpty(newTask.value){
    //alert the user if an empty space is entered as the "newTask value"
    alert('Please input a task' );       
  } else {
    //declare new list item variable
    let li = document.createElement('li');
    //add a class
    li.className = 'task-item';
    //create new checkbox element
    const checkBox = document.createElement('input');
    //add type to checkbox
    checkBox.type = 'checkbox';
    //add class to checkbox
    checkBox.className = 'ticker';
    //create link element
    const rmIcon = document.createElement('span');
    //add class to link
    rmIcon.className = 'clear-icon'
    //add content of span
    rmIcon.innerHTML = '<a><i class="fas fa-trash-alt"></i></a>'
    //append checkbox to li
    li.appendChild(checkBox);
    //append text to li
    li.appendChild(document.createTextNode(`${newTask.value}`));
    //append link to li
    li.appendChild(rmIcon)
    //append li to main list
    taskList.appendChild(li);

    //call store in local storage function
    updateLocalStorage(newTask.value);

    //add event listener for task complete
    checkBox.addEventListener('change', taskComplete);

    //clear input
    newTask.value = '';

  };

  e.preventDefault();
};

//get all li elements and store them into local storage

function updateLocalStorage(newData) {

  let storage = localStorage.getItem('storedData');

  let dataToStore;

  if (storage === null) {
    dataToStore = [];
  } else {
    dataToStore = JSON.parse(localStorage.getItem('storedData'))
  };

  dataToStore.push(newData);

  localStorage.setItem('storedData', JSON.stringify(dataToStore));

};


//make the item crossed out on checkbox click

function taskComplete(e) {

  if (e.target.checked) {
    e.target.parentElement.style.textDecoration = 'line-through';
    e.target.parentElement.style.color = 'grey';
  } else {
    e.target.parentElement.style.textDecoration = 'none';
    e.target.parentElement.style.color = 'black';
  };

};


//remove item when delect icon is clicked

function removeTask(e) {

  if (e.target.parentElement.parentElement.classList.contains('clear-icon')) {
    e.target.parentElement.parentElement.parentElement.remove();

    //call remove from local storage too
    removeFromLs(e.target.parentElement.parentElement.parentElement.innerText);
  };

}

//also remove item from local storage

function removeFromLs(whatToRemove) {

  //get local storage data
  let dataFromStorage = JSON.parse(localStorage.getItem('storedData'));

  //loop through the data and remove item
  dataFromStorage.forEach(function (data, index) {

    if (whatToRemove === data) {
      dataFromStorage.splice(index, 1);
    };

  });

  //set local storage again with new array
  localStorage.setItem('storedData', JSON.stringify(dataFromStorage));

};

//set filter function

function showFilterResults(e) {
  const listItem = taskList.querySelectorAll('li');
  const filterText = e.target.value.toLowerCase();

  listItem.forEach(function (item) {
    if (item.innerText.toLowerCase().indexOf(filterText) !== -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    };
  });
};

//set function to remove all tasks when clear btn is clicked

function clearAllTasks() {

  if (taskList.firstElementChild) {
    if (confirm('This will eraze all tasks, are you sure you want to proceed?')) {

      while (taskList.firstElementChild) {
        taskList.firstElementChild.remove();
      };
    };

    //also clear local storage
    localStorage.removeItem('storedData');
  };

};


//funtion to get all LS data on reload and display them in 

function collectAndDisplay() {

  const data = JSON.parse(localStorage.getItem('storedData'));

  if (data !== null) {
    data.forEach(function (item) {
      //declare new list item variable
      let li = document.createElement('li');
      //add a class
      li.className = 'task-item';
      //create new checkbox element
      const checkBox = document.createElement('input');
      //add type to checkbox
      checkBox.type = 'checkbox';
      //add class to checkbox
      checkBox.className = 'ticker';
      //create link element
      const rmIcon = document.createElement('span');
      //add class to link
      rmIcon.className = 'clear-icon'
      //add content of span
      rmIcon.innerHTML = '<a><i class="fas fa-trash-alt"></i></a>'
      //append checkbox to li
      li.appendChild(checkBox);
      //append text to li
      li.appendChild(document.createTextNode(item));
      //append link to li
      li.appendChild(rmIcon)
      //append li to main list
      taskList.appendChild(li);
      //add event listener for task complete
      checkBox.addEventListener('change', taskComplete);
    });
  }
};
