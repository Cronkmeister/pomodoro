export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getGradientColor = (progress: number): string => {
  const hue = 240 + progress * 120; // Transition from blue (240) to purple (300) to pink (360)
  return `hsl(${hue}, 100%, 50%)`;
};

