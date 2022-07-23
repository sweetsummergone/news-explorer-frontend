export default function FormSuccess({ onSwitch }) {
    return (
      <form
        className='modal__form modal__success'
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
  