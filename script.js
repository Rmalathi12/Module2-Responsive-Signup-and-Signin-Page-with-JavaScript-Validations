//Selecting Elements by id
    const signupCard = document.getElementById('signup-card');
    const signinCard = document.getElementById('signin-card');
    const toSigninLink = document.getElementById('to-signin');
    const toSignupLink = document.getElementById('to-signup');

    // Navigation toggles
    toSigninLink.addEventListener('click', (e) => {
      e.preventDefault();
      signupCard.classList.add('hidden');
      signinCard.classList.remove('hidden');
    });

    toSignupLink.addEventListener('click', (e) => {
      e.preventDefault();
      signinCard.classList.add('hidden');
      signupCard.classList.remove('hidden');
    });

    // Show / Hide Password
    document.querySelectorAll('.toggle-password').forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const passwordInput = document.getElementById(targetId);
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          this.textContent = 'Hide';   //Hide password
        } else {
          passwordInput.type = 'password';
          this.textContent = 'Show';      //Show password
        }
      });
    });

    // Validation Helper Functions 
    const setStatus = (inputElement, errorElement, isValid, message = "") => {
      if (isValid) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
        errorElement.textContent = "";
      } else {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        errorElement.textContent = message;
      }
    };

    const validateEmailFormat = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePasswordFormat = (password) => {
      // At least 8 characters, containing both letters and numbers
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      return password.length >= 8 && hasLetter && hasNumber;
    };

    // SignUp-Validation
    const nameInput = document.getElementById('signup-name');
    const nameErr = document.getElementById('name-error');
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim() === "") {
        setStatus(nameInput, nameErr, false, "Full Name is required.");
      } else {
        setStatus(nameInput, nameErr, true);
      }
    });

    const signupEmailInput = document.getElementById('signup-email');
    const signupEmailErr = document.getElementById('signup-email-error');
    signupEmailInput.addEventListener('input', () => {
      const val = signupEmailInput.value.trim();
      if (val === "") {
        setStatus(signupEmailInput, signupEmailErr, false, "Email is required.");
      } else if (!validateEmailFormat(val)) {
        setStatus(signupEmailInput, signupEmailErr, false, "Please enter a valid email (e.g. name@mail.com).");
      } else {
        setStatus(signupEmailInput, signupEmailErr, true);
      }
    });

    const phoneInput = document.getElementById('signup-phone');
    const phoneErr = document.getElementById('phone-error');
    phoneInput.addEventListener('input', () => {
      const val = phoneInput.value.trim();
      const digitsOnly = val.replace(/\D/g, ''); // Count only numerical entries
      if (val === "") {
        setStatus(phoneInput, phoneErr, false, "Phone number is required.");
      } else if (digitsOnly.length !== 10 || val.length !== 10) {
        setStatus(phoneInput, phoneErr, false, "Phone number must be exactly 10 digits.");
      } else {
        setStatus(phoneInput, phoneErr, true);
      }
    });

    const locationInput = document.getElementById('signup-location');
    const locationErr = document.getElementById('location-error');
    locationInput.addEventListener('input', () => {
      const val = locationInput.value.trim();
      const alphaRegex = /^[a-zA-Z\s]+$/;
      if (val === "") {
        setStatus(locationInput, locationErr, false, "Location/City is required.");
      } else if (!alphaRegex.test(val)) {
        setStatus(locationInput, locationErr, false, "Location must contain only letters.");
      } else {
        setStatus(locationInput, locationErr, true);
      }
    });

    const signupPasswordInput = document.getElementById('signup-password');
    const signupPasswordErr = document.getElementById('signup-pass-error');
    signupPasswordInput.addEventListener('input', () => {
      const val = signupPasswordInput.value;
      if (val === "") {
        setStatus(signupPasswordInput, signupPasswordErr, false, "Password is required.");
      } else if (!validatePasswordFormat(val)) {
        setStatus(signupPasswordInput, signupPasswordErr, false, "Must be at least 8 characters with letters & numbers.");
      } else {
        setStatus(signupPasswordInput, signupPasswordErr, true);
      }
      // Re-trigger confirm validation if confirm password already has content
      if (confirmInput.value !== "") confirmInput.dispatchEvent(new Event('input'));
    });

    const confirmInput = document.getElementById('signup-confirm');
    const confirmErr = document.getElementById('confirm-error');
    confirmInput.addEventListener('input', () => {
      const val = confirmInput.value;
      if (val === "") {
        setStatus(confirmInput, confirmErr, false, "Please confirm your password.");
      } else if (val !== signupPasswordInput.value) {
        setStatus(confirmInput, confirmErr, false, "Passwords do not match.");
      } else {
        setStatus(confirmInput, confirmErr, true);
      }
    });

    // Sign Up Submission Handling
    document.getElementById('signup-form').addEventListener('submit', function(e) {
      e.preventDefault();

      // Trigger all input events to catch missing fields
      nameInput.dispatchEvent(new Event('input'));
      signupEmailInput.dispatchEvent(new Event('input'));
      phoneInput.dispatchEvent(new Event('input'));
      locationInput.dispatchEvent(new Event('input'));
      signupPasswordInput.dispatchEvent(new Event('input'));
      confirmInput.dispatchEvent(new Event('input'));

      // Check if any element is marked invalid
      const totalErrors = signupCard.querySelectorAll('.form-control.invalid').length;

      if (totalErrors === 0) {
        // Collect user data
        const userData = {
          name: nameInput.value.trim(),
          email: signupEmailInput.value.trim().toLowerCase(),
          phone: phoneInput.value.trim(),
          location: locationInput.value.trim(),
          password: signupPasswordInput.value
        };

        // Save data to browser LocalStorage simulating a registered user backend
        localStorage.setItem(userData.email, JSON.stringify(userData));

        alert("Registration Successful! You can now log in.");
        
        // Clear Form Fields & Reset Indicators
        this.reset();
        signupCard.querySelectorAll('.form-control').forEach(el => el.classList.remove('valid'));

        // Transition over to the Sign In state
        signupCard.add('hidden');
        signinCard.classList.remove('hidden');
      }
    });


    // Sign IN -ValidatioN
    const signinEmailInput = document.getElementById('signin-email');
    const signinEmailErr = document.getElementById('signin-email-error-msg');
    signinEmailInput.addEventListener('input', () => {
      const val = signinEmailInput.value.trim();
      if (val === "") {
        setStatus(signinEmailInput, signinEmailErr, false, "Email is required.");
      } else if (!validateEmailFormat(val)) {
        setStatus(signinEmailInput, signinEmailErr, false, "Invalid email formatting.");
      } else {
        setStatus(signinEmailInput, signinEmailErr, true);
      }
    });

    const signinPasswordInput = document.getElementById('signin-password');
    const signinPasswordErr = document.getElementById('signin-pass-error-msg');
    signinPasswordInput.addEventListener('input', () => {
      if (signinPasswordInput.value === "") {
        setStatus(signinPasswordInput, signinPasswordErr, false, "Password is required.");
      } else {
        setStatus(signinPasswordInput, signinPasswordErr, true);
      }
    });

    // Sign In Submission & Authentication Handling
    document.getElementById('signin-form').addEventListener('submit', function(e) {
      e.preventDefault();

      // Trigger standard validation checks
      signinEmailInput.dispatchEvent(new Event('input'));
      signinPasswordInput.dispatchEvent(new Event('input'));

      const hasInvalidFields = signinCard.querySelectorAll('.form-control.invalid').length > 0;

      if (!hasInvalidFields) {
        const inputEmail = signinEmailInput.value.trim().toLowerCase();
        const inputPassword = signinPasswordInput.value;

        // Fetch user data from local storage
        const storedUserJson = localStorage.getItem(inputEmail);

        if (!storedUserJson) {
          // If profile email key doesn't exist
          setStatus(signinEmailInput, signinEmailErr, false, "This email is not registered.");
          return;
        }

        const registeredUser = JSON.parse(storedUserJson);

        // Authenticate credentials match
        if (registeredUser.password === inputPassword) {
          alert(`Authentication successful! Welcome, ${registeredUser.name}.`);
          
          // Simulated redirection to the required destination page 
          window.location.href = "https://rmalathi12.github.io/Module1_Assignment_Travel_Web_App/"; // Tourist Landing Page path
        } else {
          setStatus(signinPasswordInput, signinPasswordErr, false, "Incorrect password. Please try again.");
        }
      }
    });