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
import { DialogTitle } from "@/components/ui/dialog";

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

  const createNewFile = () => {
    // For now, we'll just create a new file in localStorage
    const files = JSON.parse(localStorage.getItem("projectFiles") || "[]");
    const newFile = {
      id: Date.now(),
      name: "New File.txt",
      content: "",
    };
    files.push(newFile);
    localStorage.setItem("projectFiles", JSON.stringify(files));
    toast.success("New file created successfully!");
  };

  const searchInProject = () => {
    // Simple search implementation using localStorage files
    const searchTerm = prompt("Enter search term:");
    if (!searchTerm) return;
    
    const files = JSON.parse(localStorage.getItem("projectFiles") || "[]");
    const results = files.filter((file: any) => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    toast.success(`Found ${results.length} results`);
    // TODO: Show results in a more user-friendly way
  };

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Command Menu</DialogTitle>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(createNewFile)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New File
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(searchInProject)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search in Project
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => {
              toast.success("Opening AI command prompt...");
              // TODO: Implement AI commands in future update
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