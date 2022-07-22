import { useState, useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";

export default function PopupWithForm({ name, onSwitch }) {
  return (
    <div className='modal'>
      <div className='modal__overlay' onClick={() => onSwitch("")} />
      <div className={`modal__content`}>
        <button
          type='button'
          className='modal__button-close'
          onClick={() => onSwitch("")}
        />
        {name === "signup" && <FormSignUp onSwitch={onSwitch} />}
        {name === "signin" && <FormSignIn onSwitch={onSwitch} closeModal={() => onSwitch("")}/>}
        {name === "success" && <FormSucess onSwitch={onSwitch} />}
      </div>
    </div>
  );
}

function FormSignUp({ onSwitch }) {
  const [tempUser, setTempUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [validation, setValidation] = useState({
    emailValid: false,
    passwordValid: false,
    usernameValid: false,
    formValid: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = errors;
    let emailValid = validation.emailValid;
    let passwordValid = validation.passwordValid;
    let usernameValid = validation.usernameValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "username":
        usernameValid = value.length >= 2;
        fieldValidationErrors.username = usernameValid ? "" : " is too short";
        break;
      default:
        break;
    }

    setValidation({
      emailValid: emailValid,
      passwordValid: passwordValid,
      usernameValid: usernameValid,
      formValid: emailValid && passwordValid && usernameValid,
    });

    setErrors(fieldValidationErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(tempUser.email, tempUser.password, tempUser.username)
      .then((res) => {
        if (!res.message && !res.error) {
          onSwitch("success");
        } else {
          throw new Error(res.message || res.error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className='modal__form' name='signup' onSubmit={handleSubmit}>
      <h2 className='modal__title'>Sign up</h2>
      <div className='modal__input-group'>
        <label>Email</label>
        <input
          name='email'
          className='modal__input modal__input_type_email'
          id='email-input'
          type='email'
          placeholder='Enter your email'
          required
          minLength='2'
          maxLength='40'
          value={tempUser.email}
          onChange={handleChange}
        />
      </div>
      <div className='modal__input-group'>
        <label>Password</label>
        <input
          name='password'
          className='modal__input modal__input_type_password'
          id='password-input'
          type='password'
          placeholder='Enter your password'
          required
          minLength='5'
          maxLength='24'
          value={tempUser.password}
          onChange={handleChange}
        />
      </div>
      <div className='modal__input-group'>
        <label>Username</label>
        <input
          name='username'
          className='modal__input modal__input_type_username'
          id='username-input'
          type='text'
          placeholder='Enter your username'
          required
          minLength='2'
          maxLength='40'
          value={tempUser.username}
          onChange={handleChange}
        />
        <FormErrors formErrors={errors} />
      </div>
      <button
        disabled={!validation.formValid}
        type='submit'
        className={!validation.formValid ? 'button modal__button-save disabled' : 'button modal__button-save'}
      >
        Sign up
      </button>
      <p className='modal__switch'>
        Or <span onClick={() => onSwitch("signin")}>sign in</span>
      </p>
    </form>
  );
}

function FormSignIn({ onSwitch, closeModal }) {
  const [tempUser, setTempUser] = useState({
    email: "",
    password: "",
  });
  const [validation, setValidation] = useState({
    emailValid: false,
    passwordValid: false,
    formValid: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { handleUserLogin } = useContext(CurrentUserContext);

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = errors;
    let emailValid = validation.emailValid;
    let passwordValid = validation.passwordValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      default:
        break;
    }

    setValidation({
      emailValid: emailValid,
      passwordValid: passwordValid,
      formValid: emailValid && passwordValid,
    });

    setErrors(fieldValidationErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(tempUser.email, tempUser.password)
      .then((res) => {
        if (!res.message && !res.error) {
          handleUserLogin(res.token);
          closeModal();
        } else {
          throw new Error(res.message || res.error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className='modal__form' name='signin' onSubmit={handleSubmit}>
      <h2 className='modal__title'>Sign in</h2>
      <div className='modal__input-group'>
        <label>Email</label>
        <input
          name='email'
          className='modal__input modal__input_type_email'
          id='email-input'
          type='email'
          placeholder='Enter your email'
          required
          minLength='2'
          maxLength='40'
          value={tempUser.email}
          onChange={handleChange}
        />
        <span className='modal__input-error email-input-error' />
      </div>
      <div className='modal__input-group'>
        <label>Password</label>
        <input
          name='password'
          className='modal__input modal__input_type_password'
          id='password-input'
          type='password'
          placeholder='Enter your password'
          required
          minLength='5'
          maxLength='24'
          value={tempUser.password}
          onChange={handleChange}
        />
        <FormErrors formErrors={errors} />
      </div>
      <button
        disabled={!validation.formValid}
        type='submit'
        className={!validation.formValid ? 'button modal__button-save disabled' : 'button modal__button-save'}
      >
        Sign in
      </button>
      <p className='modal__switch'>
        Or <span onClick={() => onSwitch("signup")}>sign up</span>
      </p>
    </form>
  );
}

function FormSucess({ onSwitch }) {
  return (
    <form
      className='modal__form'
      name='signin'
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className='modal__title'>Registration successfully completed!</h2>
      <p className='modal__switch modal__switch--success'>
        <span onClick={() => onSwitch("signin")}>Sign in</span>
      </p>
    </form>
  );
}

function FormErrors({ formErrors }) {
  return (
    <div className='modal__input-error'>
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return (
            <p key={i}>
              {fieldName} {formErrors[fieldName]}
            </p>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
}
