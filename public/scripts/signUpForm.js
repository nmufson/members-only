document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signUpForm');
  const submitButton = form.querySelector('button');
  const emailInput = document.querySelector('input[name="email"]');

  const feedbackElements = {
    firstName: document.getElementById('firstNameFeedback'),
    lastName: document.getElementById('lastNameFeedback'),
    email: document.getElementById('emailFeedback'),
    password: document.getElementById('passwordFeedback'),
    confirmPassword: document.getElementById('confirmPasswordFeedback'),
  };

  emailInput.addEventListener('blur', async () => {
    const email = emailInput.value.trim();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      // Send a request to the server to check if the email is already in use
      try {
        const response = await fetch('/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (result.exists) {
          feedbackElements.email.textContent = 'This email is already in use.';
        } else {
          feedbackElements.email.textContent = '';
        }
      } catch (error) {
        console.error('Error checking email:', error);
        emailFeedback.textContent = 'Unable to check email at the moment.';
      }
    }
  });

  form.addEventListener('input', (event) => {
    const target = event.target;
    const name = target.name;

    if (feedbackElements[name]) {
      feedbackElements[name].textContent = validateInput(target);
    }

    checkFormValidity();
  });

  function validateInput(input) {
    const name = input.name;
    const value = input.value.trim();
    let error = '';

    switch (name) {
      case 'firstName':
        if (value.length === 0) error = 'First Name is required.';
        break;
      case 'lastName':
        if (value.length === 0) error = 'Last Name is required.';
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address.';
        break;
      case 'password':
        const passwordErrors = validatePassword(value);
        if (passwordErrors.length > 0) {
          error = passwordErrors[0];
        }
        break;
      case 'confirmPassword':
        if (value !== form.querySelector('input[name="password"]').value)
          error = 'Passwords do not match.';
        break;
    }

    return error;
  }

  function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain a number');
    }
    if (!/[a-zA-Z]/.test(password)) {
      errors.push('Password must contain both lowercase and uppercase letters');
    }
    if (!/[@$!%*?&#]/.test(password)) {
      errors.push('Password must contain a special character');
    }

    return errors;
  }

  function checkFormValidity() {
    let isValid = true;

    // Check each field for validity
    for (const name of Object.keys(feedbackElements)) {
      const input = form.querySelector(`input[name="${name}"]`);
      const error = validateInput(input);

      if (error) {
        isValid = false;
      }
    }

    // Enable or disable submit button based on form validity
    submitButton.disabled = !isValid;
  }
});
