import FormSignIn from "./FormSignIn/FormSignIn";
import FormSignUp from "./FormSignUp/FormSignUp";
import FormSuccess from "./FormSuccess/FormSuccess";

export default function PopupWithForm({ name, onSwitch, onSignUp, onSignIn }) {
  return (
    <div className='modal'>
      <div className='modal__overlay' onClick={() => onSwitch("")} />
      <div className={`modal__content`}>
        <button
          type='button'
          className='modal__button-close'
          onClick={() => onSwitch("")}
        />
        {name === "signup" && <FormSignUp onSwitch={onSwitch} onSignUp={onSignUp} />}
        {name === "signin" && <FormSignIn onSwitch={onSwitch} onSignIn={onSignIn} closeModal={() => onSwitch("")}/>}
        {name === "success" && <FormSuccess onSwitch={onSwitch} />}
      </div>
    </div>
  );
}

