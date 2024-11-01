import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { File, FolderOpen, Folder, FileCode } from "lucide-react";

interface FileTab {
  id: string;
  name: string;
  content: string;
  isUnsaved: boolean;
}

const CodeEditor = () => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<FileTab[]>([]);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [files] = useState({
    'src': {
      type: 'folder',
      children: {
        'main.py': { type: 'file', content: 'print("Hello, World!")' },
        'utils': {
          type: 'folder',
          children: {
            'helpers.ts': { type: 'file', content: 'export const sum = (a: number, b: number) => a + b;' }
          }
        }
      }
    },
    'package.json': { type: 'file', content: '{\n  "name": "my-project"\n}' }
  });

  const handleFileSelect = (path: string, content: string) => {
    if (!openTabs.find(tab => tab.id === path)) {
      setOpenTabs(prev => [...prev, { id: path, name: path.split('/').pop() || path, content, isUnsaved: false }]);
    }
    setActiveFile(path);
  };

  const handleTabClose = (tabId: string) => {
    setOpenTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeFile === tabId) {
      setActiveFile(openTabs[0]?.id || null);
    }
  };

  const renderFileTree = (structure: any, path: string = '') => {
    return Object.entries(structure).map(([key, value]: [string, any]) => {
      const currentPath = path ? `${path}/${key}` : key;
      
      if (value.type === 'folder') {
        const isOpen = openFolders[currentPath];
        return (
          <div key={currentPath} className="ml-2">
            <Collapsible open={isOpen} onOpenChange={(open) => setOpenFolders(prev => ({ ...prev, [currentPath]: open }))}>
              <CollapsibleTrigger className="flex items-center gap-2 hover:bg-gray-700 p-1 rounded w-full">
                {isOpen ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
                <span className="text-sm">{key}</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {renderFileTree(value.children, currentPath)}
              </CollapsibleContent>
            </Collapsible>
          </div>
        );
      }

      return (
        <div
          key={currentPath}
          className="ml-6 flex items-center gap-2 hover:bg-gray-700 p-1 rounded cursor-pointer"
          onClick={() => handleFileSelect(currentPath, value.content)}
        >
          <FileCode className="h-4 w-4" />
          <span className="text-sm">{key}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* File Tree Sidebar */}
      <div className="w-64 border-r border-gray-700 p-2">
        <ScrollArea className="h-full">
          {renderFileTree(files)}
        </ScrollArea>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        {openTabs.length > 0 && (
          <Tabs value={activeFile || undefined} className="border-b border-gray-700">
            <TabsList className="h-10">
              {openTabs.map(tab => (
                <div key={tab.id} className="flex items-center">
                  <TabsTrigger
                    value={tab.id}
                    onClick={() => setActiveFile(tab.id)}
                    className="relative"
                  >
                    {tab.name}
                    {tab.isUnsaved && <span className="ml-1 text-blue-400">●</span>}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabClose(tab.id);
                      }}
                      className="ml-2 hover:text-red-400"
                    >
                      ×
                    </button>
                  </TabsTrigger>
                </div>
              ))}
            </TabsList>
          </Tabs>
        )}

        {/* Monaco Editor */}
        {activeFile ? (
          <Editor
            height="100%"
            defaultLanguage={activeFile.endsWith('.py') ? 'python' : activeFile.endsWith('.ts') ? 'typescript' : 'javascript'}
            theme="vs-dark"
            value={openTabs.find(tab => tab.id === activeFile)?.content}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a file to edit
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;