import ChatInterface from '../components/Chat/ChatInterface';

export default function Chat() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Nova AI Assistant</h1>
          <p className="text-gray-600 mt-2">Your personal learning companion</p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
} 