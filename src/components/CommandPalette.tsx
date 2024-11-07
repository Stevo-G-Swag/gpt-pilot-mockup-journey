import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FileText, Search, Terminal, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(() => {
              toast.success("Creating new file...");
              // TODO: Implement file creation
            })}
          >
            <Plus className="mr-2 h-4 w-4" />
            New File
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => {
              toast.success("Opening search...");
              // TODO: Implement project search
            })}
          >
            <Search className="mr-2 h-4 w-4" />
            Search in Project
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => {
              toast.success("Opening AI command prompt...");
              // TODO: Implement AI commands
            })}
          >
            <Terminal className="mr-2 h-4 w-4" />
            Run AI Command
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/files"))}
          >
            <FileText className="mr-2 h-4 w-4" />
            Browse Files
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;