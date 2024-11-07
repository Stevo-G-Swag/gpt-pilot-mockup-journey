import { FileIcon, FolderIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProjectFile {
  id: number;
  name: string;
  content: string;
  createdAt: string;
}

const Files = () => {
  const [files, setFiles] = useState<ProjectFile[]>([]);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("projectFiles") || "[]");
    setFiles(storedFiles);
  }, []);

  const handleFileClick = (file: ProjectFile) => {
    toast.info(`Opening ${file.name}...`);
    // TODO: Implement file opening in future update
  };

  const handleDelete = (id: number) => {
    const newFiles = files.filter(file => file.id !== id);
    localStorage.setItem("projectFiles", JSON.stringify(newFiles));
    setFiles(newFiles);
    toast.success("File deleted successfully");
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Project Files</h1>
      <ScrollArea className="h-[calc(100vh-12rem)] rounded-md border p-4">
        <div className="space-y-4">
          {files.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No files yet. Create a new file using Cmd/Ctrl + K
            </div>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer group"
                onClick={() => handleFileClick(file)}
              >
                <div className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4" />
                  <span>{file.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(file.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Files;