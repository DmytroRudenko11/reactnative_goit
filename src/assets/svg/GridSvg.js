import * as React from "react";
import Svg, { Rect } from "react-native-svg";
const GridSvg = (props) => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#212121"
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="miter"
    {...props}
  >
    <Rect x={2} y={2} width={8} height={8} rx={0} />
    <Rect x={2} y={14} width={8} height={8} rx={0} />
    <Rect x={14} y={2} width={8} height={8} rx={0} />
    <Rect x={14} y={14} width={8} height={8} rx={0} />
  </Svg>
);
export default GridSvg;
