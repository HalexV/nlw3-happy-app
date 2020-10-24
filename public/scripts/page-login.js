async function authentication(e) {
  e.preventDefault();

  const form = document.querySelector('#login-form');
  const emailError = document.querySelector('#email-error');
  const passwordError = document.querySelector('#password-error');

  emailError.textContent = '';
  passwordError.textContent = '';
  
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();

    if (data.errors) {
      if (data.errors.emailError) {
        emailError.textContent = data.errors.emailError;
      }

      if (data.errors.passwordError) {
        passwordError.textContent = data.errors.passwordError;
      }
    }


    if (data.user) {
      location.assign('/administration');
    }

  } catch (err) {
    console.log(err);
  }

};