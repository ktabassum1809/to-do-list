

const input = document.querySelector('#to-do');
console.log(input);

const button = document.querySelector('.add');
console.log(button);

function addTask() {
    const ul = document.querySelector('#task-list');
    console.log(ul);
    const taskList = input.value.trim();

    // Check for repetition
    const repetation = document.querySelectorAll('li');
    for (let i = 0; i < repetation.length; i++) {
        if (repetation[i].firstChild.textContent === taskList) {
            alert('Item already exists in the list');
            input.value = '';
            return;
        }
    }

    // Check for empty input
    if (taskList === '') {
        alert('Please enter the list items');
        return;
    }

    // Create new list item
    const listItem = document.createElement('li');
    listItem.textContent = taskList;

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.style.marginLeft = '450px';
    removeButton.style.width = '130px';
    removeButton.style.fontSize = '20px';
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-trash', 'fa-lg');
    removeButton.appendChild(icon);

    listItem.appendChild(removeButton);

    // Create done button
    const doneButton = document.createElement('button');
    doneButton.classList.add('done', 'undone');
    doneButton.style.width = '130px';
    doneButton.style.fontSize = '20px';
    const iconCheck = document.createElement('i');
    iconCheck.classList.add('fa-solid', 'fa-check', 'fa-lg');
    doneButton.appendChild(iconCheck);

    listItem.appendChild(doneButton);

    // Append list item to ul
    ul.appendChild(listItem);

    // Add event listener to remove button
    removeButton.addEventListener('click', () => {
        const parent = removeButton.parentElement;
        parent.remove();
    });

    // Add event listener to done button
    doneButton.addEventListener('click', () => {
        updateButton(listItem, doneButton, iconCheck);
    });

    // Clear input
    input.value = '';
}

function updateButton(listItem, doneButton, iconCheck) {
    if (doneButton.classList.contains('done')) {
        listItem.style.textDecoration = 'line-through';
        doneButton.classList.remove('done');
        doneButton.classList.add('undone');
        iconCheck.classList.remove('fa-check');
        iconCheck.classList.add('fa-circle-xmark');
    } else if (doneButton.classList.contains('undone')) {
        listItem.style.textDecoration = 'none';
        doneButton.classList.remove('undone');
        doneButton.classList.add('done');
        iconCheck.classList.remove('fa-circle-xmark');
        iconCheck.classList.add('fa-check');
    }
}

button.addEventListener('click', addTask);