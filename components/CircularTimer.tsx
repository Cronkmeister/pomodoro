import { motion } from "framer-motion";
import { formatTime } from "../utils/helpers";
import { kumbhSans, robotoSlab, spaceMono } from "../utils/fonts";

interface CircularTimerProps {
  timeLeft: number;
  duration: number;
  isActive: boolean;
  onClick: () => void;
  color: string;
  font: "sans" | "serif" | "mono";
}

export default function CircularTimer({
  timeLeft,
  duration,
  isActive,
  onClick,
  color,
  font,
}: CircularTimerProps) {
  const progress = timeLeft / duration;

  // Map font setting to actual font class
  const getFontClass = () => {
    switch (font) {
      case "sans":
        return kumbhSans.className;
      case "serif":
        return robotoSlab.className;
      case "mono":
        return spaceMono.className;
      default:
        return kumbhSans.className;
    }
  };

  return (
    <motion.div
      className="relative w-[410px] h-[410px] flex items-center justify-center cursor-pointer drop-shadow-2xl"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Outer shadow ring */}
      <div className="absolute inset-0 rounded-full bg-[#121530] opacity-80 blur-[40px]" />

      {/* Main timer container */}
      <div className="relative w-[366px] h-[366px] rounded-full bg-gradient-to-br from-[#2E325A] to-[#0E112A] shadow-2xl flex items-center justify-center">
        {/* Inner darker circle */}
        <div className="absolute w-[339px] h-[339px] rounded-full bg-[#161932]" />

        {/* SVG Timer rings */}
        <svg className="absolute w-[339px] h-[339px]" viewBox="0 0 100 100">
          {/* Background ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#161932"
            strokeWidth="1"
          />
          {/* Progress ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: progress }}
            transition={{ duration: 0.5, ease: "linear" }}
            style={{
              rotate: -90,
              transformOrigin: "center",
              // filter: `drop-shadow(0 0 5px ${color})`,
            }}
          />
        </svg>

        {/* Timer content */}
        <div className="relative flex flex-col items-center justify-center text-white">
          <span
            className={`${getFontClass()} text-[100px] tracking-tight ${
              font === "mono" ? "font-normal" : "font-bold"
            }  leading-tight text-center min-w-[280px] flex justify-center font-mono`}
          >
            {formatTime(timeLeft)}
          </span>
          <span
            className={`${kumbhSans.className} text-[14px] tracking-[0.75em] uppercase font-light mt-2 hover:text-[${color}] transition-colors`}
          >
            {isActive ? "pause" : "start"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
