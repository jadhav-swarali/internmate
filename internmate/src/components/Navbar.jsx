import { PlusCircle, Sparkles } from "lucide-react";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      
      {/* Logo */}
      <h1 className="text-xl font-bold flex items-center gap-2 text-blue-400 group cursor-pointer">
        <Sparkles className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" size={18} />
        InternMate
      </h1>

      {/* Buttons */}
      <div className="space-x-6 flex items-center">
        <button className="hover:text-blue-400 transition">
          Home
        </button>

        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 rounded-xl hover:scale-105 transition">
          <PlusCircle className="transition-transform duration-300 group-hover:rotate-90" size={18} />
          Post
        </button>
      </div>
    </div>
  );
}

export default Navbar;