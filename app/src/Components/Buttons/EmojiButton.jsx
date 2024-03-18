import classNames from "classnames";
import { Button } from "react-bootstrap";

const EmojiButton = ({ emoji, size = 18, onClick, ...props }) => {
  const buttonClassNames = classNames(
    "btn-icon p-1 d-flex align-items-center justify-content-center",
    props.className
  );

  return (
    <Button
      style={{ width: 30, height: 30, ...props.styles }}
      variant="light"
      className={buttonClassNames}
      onClick={onClick}
      {...props}
    >
      {emoji}
    </Button>
  );
};

export default EmojiButton;
