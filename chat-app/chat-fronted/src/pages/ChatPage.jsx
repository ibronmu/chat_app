import ChatRoom from '../components/ChatRoom';

export default function ChatPage() {
  const userId = localStorage.getItem('userId'); // set on login
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold">Chat Room</h1>
      <ChatRoom room="general" userId={userId} />
    </div>
  );
}
