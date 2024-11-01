import { Circle } from "lucide-react";

interface StatusIndicatorProps {
  status: "idle" | "thinking" | "error";
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const statusStyles = {
    idle: "text-secondary",
    thinking: "text-accent animate-pulse-slow",
    error: "text-red-500",
  };

  return (
    <div className="flex items-center gap-2">
      <Circle className={`h-3 w-3 ${statusStyles[status]}`} fill="currentColor" />
      <span className="text-sm font-medium capitalize">{status}</span>
    </div>
  );
};

export default StatusIndicator;