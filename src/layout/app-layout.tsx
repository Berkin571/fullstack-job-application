import { Header } from "../components/header";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="relative">
      <div className="grid-background absolute inset-0 z-0"></div>
      <main className="min-h-screen w-screen container relative z-10 m-auto">
        <Header />
        <Outlet />
      </main>
      <div className="p-7 text-center text-white bg-gray-800 mt-5 relative z-10">
        Engineered with 🔥 by KoriCode
      </div>
    </div>
  );
}
