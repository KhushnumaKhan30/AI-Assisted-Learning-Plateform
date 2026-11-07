
import {
  Search,
  Bell,
  ChevronDown,
  UserRound
} from "lucide-react";

import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      {/* Search Bar */}
      <div className="navbar-search">
        <Search size={19} />

        <input
          type="text"
          placeholder="Search subjects, topics..."
        />
      </div>

      {/* Right Section */}
      <div className="navbar-right">

        {/* Notification */}
        <button className="notification-button">
          <Bell size={21} />
          <span className="notification-dot"></span>
        </button>

        {/* Profile */}
        <div className="navbar-profile">

          <div className="profile-avatar">
            <UserRound size={21} />
          </div>

          <div className="profile-info">
            <h4>Student Name</h4>
            <span>Student</span>
          </div>

          <ChevronDown size={17} />

        </div>

      </div>

    </header>
  );
}

export default Navbar;
