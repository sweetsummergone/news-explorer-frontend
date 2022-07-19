import { useState } from "react";

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
        {name === "signin" && <FormSignIn onSwitch={onSwitch} />}
        {name === "success" && <FormSucess onSwitch={onSwitch}/>}
      </div>
    </div>
  );
}

function FormSignUp({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <form
      className='modal__form'
      name='signup'
      onSubmit={(e) => { e.preventDefault(); console.log(123); onSwitch("success")}}
    >
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
          value={email}
          onChange={handleChangeEmail}
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
          value={password}
          onChange={handleChangePassword}
        />

        <span className='modal__input-error password-input-error' />
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
          value={username}
          onChange={handleChangeUsername}
        />
        <span className='modal__input-error username-input-error' />
      </div>
      <button type='submit' className='button modal__button-save'>
        Sign up
      </button>
      <p className='modal__switch'>
        Or <span onClick={() => onSwitch("signin")}>sign in</span>
      </p>
    </form>
  );
}

function FormSignIn({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form
      className='modal__form'
      name='signin'
      onSubmit={(e) => e.preventDefault()}
    >
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
          value={email}
          onChange={handleChangeEmail}
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
          value={password}
          onChange={handleChangePassword}
        />

        <span className='modal__input-error password-input-error' />
      </div>
      <button type='submit' className='button modal__button-save'>
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
