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


const handleLoginForm = () => {
  const login = document.getElementById("login");

  const openLoginForm = () => {
    const headerLoginForm = document.querySelector(".login-form");
    const inputHeader = headerLoginForm.querySelectorAll("input");
    const loginForm = document.getElementById("login-form");

    const toggle = Array.from(inputHeader).some((input) => input.value);

    if (!toggle) {
      loginForm.classList.add("slider-form__wrap--opened");
    } else {
      loginForm.classList.remove("slider-form__wrap--opened");
      validationForm(
        ".login-form",
        fieldsLoginHeaderForm,
        "login-form__validation-error"
      );
    }
  };

  login.addEventListener("click", openLoginForm);
};

handleLoginForm();

const sliderForm = (element) => {
  const slides = document.querySelectorAll(
    element + " .slider-form__slider-item"
  );
  const progress = document.querySelector(`${element} .slider-form__progress`);
  const prev = document.querySelector(`${element} #slider-form-prev`);
  const next = document.querySelector(`${element} #slider-form-next`);
  const send = document.querySelector(`${element} #slider-form-send`);
  const validationErrorClass = "slider-form__validation-error";
  let currentSlideIndex = 0;

  const fields = [
    {
      name: "specialty",
      type: "text",
      error: "Please select your specialty",
    },
    { name: "age", type: "text", error: "Please select your age" },
    {
      name: "location",
      type: "text",
      error: "Enter your postal code to find local matches",
    },
    {
      name: "email",
      type: "email",
      error: "Please enter a valid email address",
    },
    {
      name: "password",
      type: "text",
      error: "Please enter a password to secure your account",
    },
  ];

  const progressBar = () => {
    let list = "";
    for (let index = 0; index < slides.length; index++) {
      if (index <= currentSlideIndex)
        list =
          list +
          '<li class="slider-form__progress-item slider-form__progress-item--done"></li>';
      else list = list + '<li class="slider-form__progress-item"></li>';
    }

    progress.innerHTML = list;

    next.style.display = currentSlideIndex === 4 ? "none" : "flex";
    send.style.display = currentSlideIndex === 4 ? "flex" : "none";
    prev.classList.toggle(
      "slider-form__btn--disabled",
      currentSlideIndex === 0
    );
  };

  progressBar();

  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * index}%)`;
  });

  const goPrev = () => {
    if (currentSlideIndex === 0) return null;

    currentSlideIndex--;
    progressBar();
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currentSlideIndex)}%)`;
    });
  };

  const handleInputClick = (slide) => {
    const errorMsg = slide.querySelector(`.${validationErrorClass}`);
    if (errorMsg) errorMsg.remove();
  };

  const goNext = () => {
    const currentSlide = slides[currentSlideIndex];
    const input = currentSlide.querySelector("input");
    const fieldset = currentSlide.querySelector("fieldset");
    const { error } = fields[currentSlideIndex];

    input.addEventListener("click", () => handleInputClick(currentSlide));

    if (currentSlideIndex === slides.length - 1) {
      return null;
    }

    if (validationFields(fields[currentSlideIndex], input)) {
      currentSlideIndex++;
      progressBar();
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - currentSlideIndex)}%)`;
      });
    } else {
      const errorMsg = document.createElement("div");
      errorMsg.classList.add(validationErrorClass);
      errorMsg.innerText = error;
      fieldset.appendChild(errorMsg);
    }
  };

  const goSend = (event) => {
    const input = slides[currentSlideIndex].querySelector("input");
    const fieldset = slides[currentSlideIndex].querySelector("fieldset");

    if (!validationFields(fields[currentSlideIndex], input)) {
      event.preventDefault();
      const errorMsg = document.createElement("div");
      errorMsg.classList.add(validationErrorClass);
      errorMsg.innerText = fields[currentSlideIndex].error;
      fieldset.appendChild(errorMsg);
    }

    input.addEventListener("click", () =>
      handleInputClick(slides[currentSlideIndex])
    );
  };

  prev.addEventListener("click", goPrev);
  next.addEventListener("click", goNext);
  send.addEventListener("click", goSend);

  return currentSlideIndex;
};

sliderForm(".slider-form");

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
