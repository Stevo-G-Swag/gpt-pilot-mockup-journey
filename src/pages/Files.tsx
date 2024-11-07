import { FileIcon, FolderIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Files = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Project Files</h1>
      <ScrollArea className="h-[calc(100vh-12rem)] rounded-md border p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer">
            <FolderIcon className="h-4 w-4" />
            <span>src</span>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer ml-4">
            <FileIcon className="h-4 w-4" />
            <span>App.tsx</span>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer ml-4">
            <FileIcon className="h-4 w-4" />
            <span>main.tsx</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Files;