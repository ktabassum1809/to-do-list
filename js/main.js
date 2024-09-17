const input = document.querySelector('#to-do');
console.log(input);

const button = document.querySelector('.add');
console.log(button);

function addTask(){
 /*  const input = document.querySelector('#to-do');   //inputbox */
   //button
  const ul = document.querySelector('#task-list');  //ul
  console.log(ul);
  const taskList = input.value;
   if(taskList === ''){
    alert('Please enter the list items');
    return;
   }
   const listItem = document.createElement('li');
  
 
   listItem.textContent = taskList;

   ul.appendChild(listItem);
   
   const removeButton = document.createElement('button');
   removeButton.textContent = 'Delete';
   removeButton.classList.add('remove');
   removeButton.style.marginLeft = '450px'
   removeButton.style.width = '130px'
   removeButton.style.fontSize = '20px';
   removeButton.style.marginRight = '10px';
 
   listItem.appendChild(removeButton);
   const doneButton = document.createElement('button');
   doneButton.classList.add('done');
   doneButton.textContent = 'done';
  doneButton.style.width = '130px';
  doneButton.style.fontSize = '20px';
   listItem.appendChild(doneButton);
  
   removeButton.addEventListener('click', () => {
        const parent = removeButton.parentElement;
        parent.remove();
   });

   doneButton.addEventListener('click', () => {
       
    
    const parent = doneButton.parentElement;
    parent.style.textDecoration = 'line-through';
    const doButton = document.querySelector('.done');
    doButton.remove();
    
   })
 
  
   input.value = '';
}
button.addEventListener('click',addTask );