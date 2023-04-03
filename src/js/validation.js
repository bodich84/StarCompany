const isFieldEmpty = (value) => {
  return !!value.trim();
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  return emailRegex.test(email.trim());
};

const validationFields = (object, fieldValue) => {
  if (object.type === "text") {
    return isFieldEmpty(fieldValue.value);
  }

  if (object.type === "email") {
    return isValidEmail(fieldValue.value);
  }

  return true;
};

const fieldsLoginHeaderForm = [
  {
    name: "email",
    type: "email",
    error: "Please enter a valid email address",
  },
  {
    name: "password",
    type: "text",
    error: "Please enter your password",
  },
];

const validationForm = (element, checkList, errorMsgClass) => {
  const loginForm = document.querySelector(element);

  checkList.forEach((checkItem) => {
    const input = loginForm.querySelector(`input[name='${checkItem.name}']`);

    const handleInputClick = () => {
      const errorMsg = input.parentElement.querySelector(`.${errorMsgClass}`);
      if (errorMsg) errorMsg.remove();
    };

    input.addEventListener("click", handleInputClick);

    if (input.parentElement.querySelector(`.${errorMsgClass}`)) return null;

    if (!validationFields(checkItem, input)) {
      const errorMsg = document.createElement("div");
      errorMsg.classList.add(errorMsgClass);
      errorMsg.innerText = checkItem.error;
      input.parentElement.appendChild(errorMsg);
    }
  });
};
