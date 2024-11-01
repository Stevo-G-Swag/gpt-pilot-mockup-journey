const CodeEditor = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-sm">main.py</span>
      </div>
      <pre className="text-gray-300 font-mono text-sm">
        <code>{`def process_data(input_data):
    """
    Process the input data using AI algorithms
    """
    result = analyze(input_data)
    return optimize(result)

# AI is suggesting improvements...`}</code>
      </pre>
    </div>
  );
};

export default CodeEditor;