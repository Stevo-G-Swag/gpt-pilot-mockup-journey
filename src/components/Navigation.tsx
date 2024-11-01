import { Rocket, Settings, User } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="bg-primary px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-white" />
          <span className="text-xl font-bold text-white">GPT-Pilot</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-secondary transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <button className="text-white hover:text-secondary transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;