import { Link } from "react-router-dom";

import { headerStyle, headerLinkStyle } from "../constant/styles/styles";

const Header = () => {
  return (
    <div style={headerStyle}>
      <div>
        <Link to="/" style={headerLinkStyle}>
          Home
        </Link>
      </div>
      <div>
        <div>Link</div>
      </div>
    </div>
  );
};

export default Header;
