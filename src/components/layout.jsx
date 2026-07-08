import { Link } from "react-router-dom";
import { LayoutDashboard, ClipboardList } from "lucide-react";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <Link to="/">
            <h1 className="text-2xl font-bold text-blue-600">Paroki Dalem</h1>
          </Link>

          <nav className="flex gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/pendataan"
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600"
            >
              <ClipboardList size={18} />
              Pendataan Baru
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
}

export default Layout;
