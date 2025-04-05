"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSettings } from "../contexts/SettingsContext";
import { ChevronUp, ChevronDown, X, Check } from "lucide-react";
import { kumbhSans, robotoSlab, spaceMono } from "../utils/fonts";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, setSettings } = useSettings();
  const [tempSettings, setTempSettings] = useState(settings);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempSettings((prev) => ({
      ...prev,
      [name]: Number.parseInt(value, 10),
    }));
  };

  const handleTimeAdjust = (timerType: string, adjustment: number) => {
    setTempSettings((prev) => ({
      ...prev,
      [timerType]: Math.max(
        1,
        Math.min(60, Number(prev[timerType as keyof typeof prev]) + adjustment)
      ),
    }));
  };

  const handleFontChange = (value: string) => {
    setTempSettings((prev) => ({
      ...prev,
      font: value as "sans" | "serif" | "mono",
    }));
  };

  const handleColorChange = (value: string) => {
    setTempSettings((prev) => ({
      ...prev,
      color: value as "#f87070" | "#70f3f8" | "#d881f8",
    }));
  };

  const handleApply = () => {
    setSettings(tempSettings);
    onClose();
  };

  const getFontClass = (font: string) => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[540px] w-[87%] p-0 bg-white rounded-[15px] md:rounded-[30px] font-sans"
        hideDefaultClose
      >
        <div className="p-6 md:p-10 relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-[#E3E1E1] pb-4 md:pb-7">
            <h2 className="text-[#1E213F] text-[20px] md:text-[28px] font-bold">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="text-[#1E213F] opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={24} />
            </button>
          </div>

          {/* Time Section */}
          <div className="mb-6">
            <h3 className="text-[#161932] text-[11px] md:text-[13px] font-bold tracking-[5px] text-center md:text-left mb-6">
              TIME (MINUTES)
            </h3>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
              {[
                { label: "pomodoro", key: "pomodoro" },
                { label: "short break", key: "shortBreak" },
                { label: "long break", key: "longBreak" },
              ].map(({ label, key }) => (
                <div
                  key={key}
                  className="flex items-center justify-between md:flex-col md:items-start"
                >
                  <Label className="text-[#1E213F] text-[12px] font-semibold opacity-40 mb-0 md:mb-2">
                    {label}
                  </Label>
                  <div className="relative w-[140px] md:w-full">
                    <Input
                      type="number"
                      name={key}
                      value={tempSettings[key as keyof typeof tempSettings]}
                      onChange={handleInputChange}
                      className="h-12 pl-4 bg-[#EFF1FA] border-0 rounded-[10px] text-[14px] font-bold text-[#1E213F]  appearance-none"
                    />
                    <div className="absolute right-3 inset-y-0 flex flex-col justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleTimeAdjust(key, 1)}
                        className="text-[#1E213F] opacity-25 hover:opacity-100"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTimeAdjust(key, -1)}
                        className="text-[#1E213F] opacity-25 hover:opacity-100"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Font Section */}
          <div className="mb-6 border-t border-[#E3E1E1] pt-6">
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0">
              <h3 className="text-[#161932] text-[11px] md:text-[13px] font-bold tracking-[5px]">
                FONT
              </h3>
              <RadioGroup
                value={tempSettings.font}
                onValueChange={handleFontChange}
                className="flex gap-4"
              >
                {["sans", "serif", "mono"].map((font) => (
                  <div key={font}>
                    <RadioGroupItem
                      value={font}
                      id={font}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={font}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all relative
                        ${
                          tempSettings.font === font
                            ? "bg-[#161932] text-white"
                            : "bg-[#EFF1FA] text-[#585972] hover:before:absolute hover:before:inset-[-4px] hover:before:border hover:before:border-[#161932]/20 hover:before:rounded-full"
                        }`}
                    >
                      <span
                        className={`text-md font-semibold ${getFontClass(
                          font
                        )}`}
                      >
                        Aa
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Color Section */}
          <div className="border-t border-[#E3E1E1] pt-6 mb-12">
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0">
              <h3 className="text-[#161932] text-[11px] md:text-[13px] font-bold tracking-[5px]">
                COLOR
              </h3>
              <RadioGroup
                value={tempSettings.color}
                onValueChange={handleColorChange}
                className="flex gap-4"
              >
                {["#f87070", "#70f3f8", "#d881f8"].map((color) => (
                  <div key={color}>
                    <RadioGroupItem
                      value={color}
                      id={color}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={color}
                      className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer relative hover:before:absolute hover:before:inset-[-4px] hover:before:border hover:before:border-[#161932]/20 hover:before:rounded-full"
                      style={{ backgroundColor: color }}
                    >
                      {tempSettings.color === color && (
                        <Check className="w-4 h-4 text-[#161932]" />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <Button
            onClick={handleApply}
            className="translate-y-1/2 px-12 py-3 h-14 bg-[#f87070] hover:bg-[#ff9898] text-white rounded-[26.5px] text-base font-bold"
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
