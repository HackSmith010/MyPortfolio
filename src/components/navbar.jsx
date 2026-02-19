import dayjs from "dayjs";
import React from "react";
import { navLinks, navIcons } from "#constants";

const Navbar = () => {
  return (
    <nav>
      {/* Left: Activities + app name */}
      <div className="nav-left">
        {/* Ubuntu circle logo as SVG */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="8.5" fill="#E95420" />
          <circle cx="9" cy="9" r="3.5" fill="white" />
          <circle cx="3" cy="9" r="1.8" fill="white" />
          <circle cx="14.2" cy="5.2" r="1.8" fill="white" />
          <circle cx="14.2" cy="12.8" r="1.8" fill="white" />
        </svg>

        <span className="activities-btn">Activities</span>

        <ul>
          {navLinks.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Center: App name */}
      <span className="nav-app-name">Anshu's Portfolio</span>

      {/* Right: System tray + time */}
      <div className="nav-right">
        <ul>
          {navIcons.map((icon) => (
            <li key={icon.id}>
              <img
                src={icon.img}
                alt={`tray-${icon.id}`}
                className="tray-icon"
              />
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd MMM DD hh:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
