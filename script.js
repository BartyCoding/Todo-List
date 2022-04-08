var input = document.getElementById("new-input")
var todoList = document.getElementById("todo-list")

let updateInputMargin = () => {
    if (currentItems.length === 0) {
        input.classList.add("no-margin")
    }
    else {
        input.classList.remove("no-margin")
    }
}

let addItem = (value, id) => {
    let newItem = document.createElement("li");

    newItem.textContent = value

    todoList.appendChild(newItem)

    newItem.addEventListener("click", () => {
        newItem.remove()
        let foundIndex = -1;
        currentItems.findIndex((dict, index) => {
            if (dict.id === id) {
                foundIndex = index
                return dict;
            }
        })
        currentItems.splice(foundIndex, 1)
        saveList();
        updateInputMargin()
    })
}

let currentItems = JSON.parse(localStorage.getItem("todoList")) || []

for (let i in currentItems) {
    addItem(currentItems[i].value, currentItems[i].id)
}



updateInputMargin()

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let getRandomId = () => {
    let random = 0
    while (true) {
        random = getRandomInt(10000)
        let used = false
        for (i = 0; i < currentItems.length; i++) {
            if (currentItems[i].id === random) {
                used = true
                break
            }
        }
        if (used === false) {
            break
        }
    }
    return random
}

let saveList = () => {
    localStorage.setItem("todoList", JSON.stringify(currentItems))
}

input.addEventListener("keyup", e => {
    if ((e.key == 'Enter' || e.keyCode === 13) && input.value !== "") {
        e.preventDefault();

        let randomId = getRandomId()

        addItem(input.value, randomId)

        currentItems.push({ "value": input.value, "id": randomId })

        updateInputMargin()
        saveList()

        input.value = ""
    }
})