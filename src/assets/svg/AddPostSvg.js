import * as React from "react";
import Svg, { Path } from "react-native-svg";
const AddPostSvg = (props) => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFFFFF"
    {...props}
  >
    <Path d="M14 7v1H8v6H7V8H1V7h6V1h1v6h6z" />
  </Svg>
);
export default AddPostSvg;
