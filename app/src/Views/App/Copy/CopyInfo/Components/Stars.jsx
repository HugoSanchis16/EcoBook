import { GoStarFill } from "react-icons/go";

const StarsComponent = ({ state }) => {
  return (
    <div>
      {[...new Array(state + 1).keys()].map((index) => (
        <GoStarFill />
      ))}
    </div>
  );
};

export default StarsComponent;
