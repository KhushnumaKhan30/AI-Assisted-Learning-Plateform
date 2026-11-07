
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  ClipboardList,
  ChartNoAxesColumnIncreasing,
  Bot,
  Settings,
  LogOut,
  Brain,
} from "lucide-react";

import "../styles/Sidebar.css";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Subjects",
      path: "/subjects",
      icon: BookOpen,
    },
    {
      title: "My Learning",
      path: "/learning",
      icon: GraduationCap,
    },
    {
      title: "Quizzes",
      path: "/quiz",
      icon: ClipboardList,
    },
    {
      title: "My Progress",
      path: "/progress",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      title: "AI Assistant",
      path: "/ai-assistant",
      icon: Bot,
    },
  ];

  return (
    <aside className="sidebar">

      {/* Logo Section */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Brain size={25} />
        </div>

        <div className="logo-text">
          <h2>AALP</h2>
          <span>Learn Smarter</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="sidebar-menu">
        <p className="menu-heading">MAIN MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              to={item.path}
              key={item.title}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Menu */}
      <div className="sidebar-bottom">
        <NavLink to="/settings" className="menu-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

        <button className="menu-item logout-button">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
