import ChatInterface from '../components/Chat/ChatInterface';

export default function Chat() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Chat with Nova</h1>
      <ChatInterface />
    </div>
  );
} 