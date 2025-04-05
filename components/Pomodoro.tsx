"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";
import TimerSlider from "./TimerSlider";
import CircularTimer from "./CircularTimer";
import SettingsModal from "./SettingsModal";
import { kumbhSans } from "../utils/fonts";

type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

export default function Pomodoro() {
  const { settings } = useSettings();
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(settings.pomodoro * 60);
  const [isActive, setIsActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    setTimeLeft(settings.pomodoro * 60);
  }, [settings.pomodoro]); // Added settings.pomodoro to dependencies

  useEffect(() => {
    const timerDurations = {
      pomodoro: settings.pomodoro * 60,
      shortBreak: settings.shortBreak * 60,
      longBreak: settings.longBreak * 60,
    };
    setTimeLeft(timerDurations[mode]);
    setIsActive(false);
  }, [settings, mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(settings[newMode] * 60);
    setIsActive(false);
  };

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(settings[mode] * 60);
    }
    setIsActive(!isActive);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-[#1E213F] text-white p-4 ${kumbhSans.className}`}
    >
      <h1 className="text-[32px] font-bold text-[#D7E0FF] mb-12">pomodoro</h1>
      <TimerSlider
        mode={mode}
        onModeChange={handleModeChange}
        color={settings.color}
      />
      <CircularTimer
        timeLeft={timeLeft}
        duration={settings[mode] * 60}
        isActive={isActive}
        onClick={toggleTimer}
        color={settings.color}
        font={settings.font}
      />
      <motion.button
        className="mt-12 p-2 rounded-full text-[#D7E0FF] opacity-60 hover:opacity-100 transition-opacity"
        onClick={() => setIsSettingsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings className="w-7 h-7" />
      </motion.button>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
