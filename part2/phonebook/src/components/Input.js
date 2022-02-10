const Input = ({ text, state, eventHandler }) => {
  return (
    <>
      <div>
        {text}: <input value={state} onChange={eventHandler} />
      </div>
    </>
  );
};

export default Input;
