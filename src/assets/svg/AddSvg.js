import * as React from "react";
import Svg, { Rect, Circle } from "react-native-svg";
const AddSvg = (props) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    enableBackground="new 0 0 32 32"
    xmlSpace="preserve"
    {...props}
  >
    <Circle
      fill="#FFFFFF"
      stroke="#FF6C00"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={16}
      cy={16}
      r={12}
    />
    <Rect x={10} y={15} width={12} height={2} fill="#FF6C00" />
    <Rect x={15} y={10} width={2} height={12} fill="#FF6C00" />
  </Svg>
);

export default AddSvg;
