const Notification = ({ message, name }) => {
  if (message === null) {
    return <></>;
  }
  let text = "";
  if (message === "error")
    text = `Information of ${name} has already been removed from the server`;
  else text = `${message} ${name}`;
  return (
    <>
      <p className={`notification ${message.toLowerCase()}`}>{text}</p>
    </>
  );
};

export default Notification;
