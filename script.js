// Load data from storage on page load
window.onload = function () {
  loadFromStorage();
};

// Handle form submit
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var image = document.getElementById("imageUpload").files[0];

  // Create a FileReader to read the selected image file
  var reader = new FileReader();
  reader.onload = function () {
    var imageData = reader.result;

    // Create new data object
    var data = {
      name: name,
      email: email,
      image: imageData,
    };

    // Save data to storage
    saveToStorage(data);

    // Clear form inputs
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("imageUpload").value = "";

    // Refresh data list
    loadFromStorage();
  };

  if (image) {
    // Read the selected image file as a data URL
    reader.readAsDataURL(image);
  }
});

// Save data to storage
function saveToStorage(data) {
  var items = [];

  // Check if data already exists in storage
  if (localStorage.getItem("items")) {
    items = JSON.parse(localStorage.getItem("items"));
  }

  // Add new data to items array
  items.push(data);

  // Save updated items array to storage
  localStorage.setItem("items", JSON.stringify(items));
}

// Load data from storage
function loadFromStorage() {
  var table = document.getElementById("data-table");
  table.innerHTML = "";

  if (localStorage.getItem("items")) {
    var items = JSON.parse(localStorage.getItem("items"));

    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    var headers = ["Name", "Email", "Image", "Actions"];

    headers.forEach(function (header) {
      var th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    items.forEach(function (item, index) {
      var row = document.createElement("tr");

      var nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      var emailCell = document.createElement("td");
      emailCell.textContent = item.email;
      row.appendChild(emailCell);

      var imageCell = document.createElement("td");
      var imageElement = document.createElement("img");
      imageElement.src = item.image;
      imageElement.style.maxWidth = "100px";
      imageElement.style.maxHeight = "100px";
      imageCell.appendChild(imageElement);
      row.appendChild(imageCell);

      var actionsCell = document.createElement("td");

      // Edit button
      var editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function () {
        editItem(index);
      });
      actionsCell.appendChild(editButton);

      // Delete button
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteItem(index);
      });
      actionsCell.appendChild(deleteButton);

      row.appendChild(actionsCell);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
  }
}

// Edit item
function editItem(index) {
  var items = JSON.parse(localStorage.getItem("items"));

  var item = items[index];
  var newName = prompt("Enter the new name:", item.name);
  var newEmail = prompt("Enter the new email:", item.email);

  // Update the item
  item.name = newName;
  item.email = newEmail;

  // Save the updated item to storage
  localStorage.setItem("items", JSON.stringify(items));

  // Refresh the data table
  loadFromStorage();
}

// Delete item
function deleteItem(index) {
  var items = JSON.parse(localStorage.getItem("items"));

  // Remove the item from the array
  items.splice(index, 1);

  // Save the updated array to storage
  localStorage.setItem("items", JSON.stringify(items));

  // Refresh the data table
  loadFromStorage();
}
