import { Check, X } from "lucide-react";
import { Button } from "./ui/button";

interface AISuggestionPanelProps {
  suggestion: string;
  onAccept: () => void;
  onReject: () => void;
}

const AISuggestionPanel = ({ suggestion, onAccept, onReject }: AISuggestionPanelProps) => {
  return (
    <div className="absolute right-0 top-16 w-64 bg-popover border border-border rounded-lg shadow-lg animate-in slide-in-from-right-5">
      <div className="p-4">
        <div className="text-sm font-medium mb-2">AI Suggestion</div>
        <pre className="text-xs bg-muted p-2 rounded mb-3 overflow-x-auto">
          {suggestion}
        </pre>
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onReject}
            className="h-8 px-2 text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onAccept}
            className="h-8 px-2 text-primary hover:text-primary"
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionPanel;