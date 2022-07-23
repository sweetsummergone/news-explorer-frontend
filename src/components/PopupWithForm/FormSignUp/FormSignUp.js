import FormErrors from "../FormErrors/FormErrors";
import useFormAndValidation from "../../../utils/hooks/useFormValidation";

export default function FormSignUp({ onSwitch, onSignUp }) {
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()

    const handleSubmit = (e) => {
      e.preventDefault();
      onSignUp(values.email, values.password, values.username)
        .then((res) => {
          if (!res.message && !res.error) {
            resetForm();
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
            value={values.email || ""}
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
            minLength='8'
            maxLength='24'
            value={values.password || ""}
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
            value={values.username || ""}
            onChange={handleChange}
          />
          <FormErrors formErrors={errors} />
        </div>
        <button
          disabled={!isValid}
          type='submit'
          className={!isValid ? 'button modal__button-save disabled' : 'button modal__button-save'}
        >
          Sign up
        </button>
        <p className='modal__switch'>
          Or <span onClick={() => onSwitch("signin")}>sign in</span>
        </p>
      </form>
    );
}
  