import { Colors } from "../../Utils/Colors";

const Badge = ({ background = Colors.blue, children }) => {
  return (
    <small
      className="me-1 rounded px-2 fw-bold"
      style={{ background, fontSize: "0.75rem" }}
    >
      {children}
    </small>
  );
};

export default Badge;
