import { GoStarFill } from "react-icons/go";

const StarsComponent = ({ state }) => {
  switch (state) {
    case 0:
      return <GoStarFill />;
    case 1:
      return (
        <div>
          <GoStarFill />
          <GoStarFill />
        </div>
      );
    case 2:
      return (
        <div>
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
        </div>
      );
    case 3:
      return (
        <div>
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
        </div>
      );
    case 4:
      return (
        <div>
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
        </div>
      );
  }
};

export default StarsComponent;
