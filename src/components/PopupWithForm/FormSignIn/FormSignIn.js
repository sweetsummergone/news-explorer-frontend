import { useContext } from "react";

import FormErrors from "../FormErrors/FormErrors";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import useFormAndValidation from "../../../utils/hooks/useFormValidation";

export default function FormSignIn({ onSwitch, closeModal, onSignIn }) {
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()
  
    const { handleUserLogin } = useContext(CurrentUserContext);

    const handleSubmit = (e) => {
      e.preventDefault();
      onSignIn(values.email, values.password)
        .then((res) => {
          if (!res.message && !res.error) {
            handleUserLogin(res.token);
            resetForm();
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
            value={values.email || ""}
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
            minLength='8'
            maxLength='24'
            value={values.password || ""}
            onChange={handleChange}
          />
          <FormErrors formErrors={errors} />
        </div>
        <button
          disabled={!isValid}
          type='submit'
          className={!isValid ? 'button modal__button-save disabled' : 'button modal__button-save'}
        >
          Sign in
        </button>
        <p className='modal__switch'>
          Or <span onClick={() => onSwitch("signup")}>sign up</span>
        </p>
      </form>
    );
  }
  