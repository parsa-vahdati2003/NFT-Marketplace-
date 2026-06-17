import $ from "jquery";

$(function () {
  console.log("Welcome to Mastering jQuery: Write Less, Do More");

  //   Selectors
  const form = $("#form");

  const userName = $("#userName");
  const userNameFeedback = $("#user-name-feedback");

  const emailAddress = $("#email-address");
  const emailFeedback = $("#email-address-feedback");

  const password = $("#password");
  const passwordFeedback = $("#password-feedback");

  const confirmPassword = $("#confirm-password");
  const confirmPasswordFeedback = $("#confirm-password-feedback");

  // email pattern and password pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  // highlight

  function highlight(element, isValid) {
    if (isValid) {
      element.css({
        "border-color": "#080",

        "box-shadow": "0 0 0 5px rgba(0, 136, 0, 0.3)",
      });
    } else {
      element.css({
        "border-color": "#800",
        "box-shadow": "0 0 0 5px rgba(136, 0, 0, 0.3)",
      });
    }
  }

  // userName highlight
  userName.blur(function () {
    const value = userName.val().trim();

    const isValid = value !== "" && value.length >= 3;

    highlight(userName, isValid);

    if (!isValid) {
      userNameFeedback.text("Username is required and at least 3 characters");
    } else {
      userNameFeedback.text("");
    }
  });

  // email highlight

  emailAddress.blur(function () {
    const value = emailAddress.val().trim();

    const isValid = value !== "" && emailPattern.test(value);

    highlight(emailAddress, isValid);

    if (!isValid) {
      emailFeedback.text("Email is invalid");
    } else {
      emailFeedback.text("");
    }
  });

  // password highlight
  password.blur(function () {
    const value = password.val().trim();

    const isValid = value !== "" && passwordPattern.test(value);

    highlight(password, isValid);

    if (!isValid) {
      passwordFeedback.text(
        "Password must include letters and numbers and be at least 8 characters",
      );
    } else {
      passwordFeedback.text("");
    }
  });

  // confirm password highlight
  confirmPassword.blur(function () {
    const value = confirmPassword.val().trim();
    const passwordValue = password.val().trim();

    const isValid = value !== "" && value === passwordValue;

    highlight(confirmPassword, isValid);

    if (!isValid) {
      confirmPasswordFeedback.text("Passwords do not match");
    } else {
      confirmPasswordFeedback.text("");
    }
  });

  //submit
  form.submit(function (event) {
    // event.preventDefault();

    const userNameVal = userName.val().trim();
    const emailAddressVal = emailAddress.val().trim();
    const passwordVal = password.val().trim();

    const confirmPasswordVal = confirmPassword.val().trim();

    let isValid = true;

    //userName valid
    if (userNameVal === "" || userNameVal.length < 3) {
      userNameFeedback.text("Username is required and at least 3 charecter");
      isValid = false;
    } else {
      userNameFeedback.text("");
    }

    //email valid

    if (emailAddressVal === "" || !emailPattern.test(emailAddressVal)) {
      emailFeedback.text("Email is invalid");
      isValid = false;
    } else {
      emailFeedback.text("");
    }

    //password valid

    if (passwordVal === "" || !passwordPattern.test(passwordVal)) {
      passwordFeedback.text("Password must be include letters and numbers");
      isValid = false;
    } else {
      passwordFeedback.text("");
    }

    // confirm password valid
    if (confirmPasswordVal === "" || confirmPasswordVal !== passwordVal) {
      confirmPasswordFeedback.text("Passwords do not match");
      isValid = false;
    } else {
      confirmPasswordFeedback.text("");
    }

    // checking
    if (!isValid) {
      console.log("Form invalid");
      return;
    }

    // post
    $.ajax({
      url: "http://localhost:3001/users",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        userName: userNameVal,
        email: emailAddressVal,
        password: passwordVal,
        confirmPassword: confirmPasswordVal,
      }),
      success: function (res) {
        console.log("User saved:", res);
      },
      error: function (err) {
        console.log("Error:", err);
      },
    });

    // final check
    if (isValid === true) {
      console.log("Form is valid ", isValid);
    }
  });
});
