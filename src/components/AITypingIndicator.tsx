import { Loader2 } from "lucide-react";

const AITypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground p-2 animate-in fade-in-0">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">AI is thinking...</span>
    </div>
  );
};

export default AITypingIndicator;