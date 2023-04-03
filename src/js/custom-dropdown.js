const customDropdown = (element) => {
  const dropdown = document.querySelector(element);
  const input = document.querySelector(element + " .dropdown__input");
  const listOfOptions = document.querySelectorAll(element + " .dropdown__option");
  const body = document.body;

  const toggleDropdown = (event) => {
    event.stopPropagation();
    dropdown.classList.toggle("dropdown__opened");
  };

  const selectOption = (event) => {
    input.value = event.currentTarget.textContent.trim();
  };

  const closeDropdownFromOutside = () => {
    if (dropdown.classList.contains("dropdown__opened")) {
      dropdown.classList.remove("dropdown__opened");
    }
  };

  body.addEventListener("click", closeDropdownFromOutside);

  listOfOptions.forEach((option) => {
    option.addEventListener("click", selectOption);
  });

  dropdown.addEventListener("click", toggleDropdown);
};

customDropdown(".dropdown--technology");
customDropdown(".dropdown--age");

