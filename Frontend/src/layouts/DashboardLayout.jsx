
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/DashboardLayout.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="dashboard-main">

        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="dashboard-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;
