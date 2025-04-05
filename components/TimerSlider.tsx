import { motion } from "framer-motion";
import { kumbhSans } from "../utils/fonts";

type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

interface TimerSliderProps {
  mode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  color: string;
}

export default function TimerSlider({
  mode,
  onModeChange,
  color,
}: TimerSliderProps) {
  return (
    <div className="flex justify-center items-center mb-12 bg-[#161932] rounded-full p-2 relative">
      {(["pomodoro", "shortBreak", "longBreak"] as TimerMode[]).map(
        (timerMode, index) => (
          <motion.button
            key={timerMode}
            className={`relative px-6 py-4 rounded-full text-sm ${
              kumbhSans.className
            } font-bold z-10
            ${
              mode === timerMode
                ? "text-[#1E213F]"
                : "text-[#D7E0FF] opacity-40 hover:opacity-100"
            }`}
            onClick={() => onModeChange(timerMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {timerMode === "pomodoro"
              ? "pomodoro"
              : timerMode === "shortBreak"
              ? "short break"
              : "long break"}
          </motion.button>
        )
      )}
      <motion.div
        className="absolute top-2 bottom-2 rounded-full z-0"
        style={{ backgroundColor: color }}
        layoutId="activeTimerBackground"
        initial={false}
        animate={{
          left:
            mode === "pomodoro"
              ? "2px"
              : mode === "shortBreak"
              ? "33.333%"
              : "66.666%",
          width: "33.333%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}
