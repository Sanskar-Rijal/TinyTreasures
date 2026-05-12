import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ScrollToTop from "../ui/ScrollToTop";
import ChatBot from "../features/ChatBot/ChatBot";

function AppLayout() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default AppLayout;
