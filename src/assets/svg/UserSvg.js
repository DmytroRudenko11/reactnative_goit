import * as React from "react";
import Svg, { Path } from "react-native-svg";
const UserSvg = (props) => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 1024 1024"
    className="icon"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fill="#212121"
      d="M512 512a192 192 0 100-384 192 192 0 000 384zm0 64a256 256 0 110-512 256 256 0 010 512zm320 320v-96a96 96 0 00-96-96H288a96 96 0 00-96 96v96a32 32 0 11-64 0v-96a160 160 0 01160-160h448a160 160 0 01160 160v96a32 32 0 11-64 0z"
    />
  </Svg>
);
export default UserSvg;
