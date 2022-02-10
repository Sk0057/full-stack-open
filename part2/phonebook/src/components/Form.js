import Input from "./Input";

const Form = ({ onSubmit, inputs, buttonType, buttonText }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        {inputs.map((input) => (
          <Input
            key={input.text}
            text={input.text}
            state={input.state}
            eventHandler={input.eventHandler}
          />
        ))}
        <div>
          <button type={buttonType}>{buttonText}</button>
        </div>
      </form>
    </>
  );
};

export default Form;
