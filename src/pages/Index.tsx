import Navigation from "@/components/Navigation";
import CodeEditor from "@/components/CodeEditor";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          <div className="h-full">
            <CodeEditor />
          </div>
          <div className="h-full">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;