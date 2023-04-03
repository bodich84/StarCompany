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
