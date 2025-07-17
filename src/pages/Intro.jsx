import { useNavigate } from "react-router-dom";
import IntroImage from "@/assets/intro.png";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* תמונה במרכז */}
      <img
        src={IntroImage}
        alt="Intro Logo"
        className="w-64 h-auto mb-10 animate-fade-in"
      />

      {/* כפתור התחלה */}
      <button
        onClick={() => navigate("/flow")}
        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 text-lg font-semibold"
      >
        התחלה
      </button>
    </div>
  );
}
