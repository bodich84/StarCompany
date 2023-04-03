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
