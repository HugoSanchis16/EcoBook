import { useEffect, useState } from "react";
import { Colors } from "../../Utils/Colors";

const AnimationBalls = ({
  color = `${Colors.lightYellow}`,
  size = 15,
  style,
}) => {
  const time = 1500; // In milliseconds

  const getRandom = () => Math.round(Math.random() * 100 + 25);

  const [ballSettings, setBallSettings] = useState({
    top: {
      right: getRandom(),
      left: getRandom(),
    },
    bottom: {
      right: getRandom(),
      left: getRandom(),
    },
  });

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setBallSettings({
        top: {
          right: getRandom(),
          left: getRandom(),
        },
        bottom: {
          right: getRandom(),
          left: getRandom(),
        },
      });
    }, time);

    return () => {
      clearInterval(interval);
      interval = null;
    };
  }, []);

  return (
    <div
      className="bigBalls"
      style={{
        background: color,
        borderTopLeftRadius: `${ballSettings.top.left}%`,
        borderTopRightRadius: `${ballSettings.top.right}%`,
        borderBottomLeftRadius: `${ballSettings.bottom.left}%`,
        borderBottomRightRadius: `${ballSettings.bottom.right}%`,
        transition: `${time / 1000}s`,
        boxShadow: `0 0 200px 200px ${color}`,
        height: `${size}rem`,
        width: `${size}rem`,
        ...style,
      }}
    />
  );
};

export default AnimationBalls;
