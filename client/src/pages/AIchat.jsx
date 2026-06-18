import { useState } from "react";
import axios from "axios";

function AIChat(){
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
  const handleSend = async () => {
  if (!message.trim()) return  // don't send empty messages

  const userMessage = { role: 'user', content: message }
  const updatedMessages = [...messages, userMessage]
  
  setMessages(updatedMessages)  // add user message to chat
  setMessage('')                // clear input
  setIsLoading(true)            // show "AI is thinking"

  try {
    const response = await axios.post(
      'https://healthmind-backend.onrender.com/api/ai/chat',
      { messages: updatedMessages }
    )
    
    const aiMessage = { role: 'assistant', content: response.data.reply }
    setMessages([...updatedMessages, aiMessage])
  } catch (error) {
    console.log('Error:', error)
  } finally {
    setIsLoading(false)  // hide "AI is thinking"
  }
}

return (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    
    {/* Header */}
    <div className="bg-white shadow-sm p-4 border-b">
      <h1 className="text-2xl font-bold text-blue-600">🤖 AI Health Chat</h1>
      <p className="text-gray-400 text-sm">Chat with your personal health assistant</p>
    </div>

    {/* Messages Area */}
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-5xl mb-4">🤖</p>
          <p className="text-xl font-bold">Hi! I'm your health assistant</p>
          <p className="text-sm mt-2">Ask me anything about your health!</p>
        </div>
      )}
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
            msg.role === 'user' 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
          }`}>
            <p className="text-sm whitespace-pre-wrap">
        {msg.content
          .replace(/\*\*(.*?)\*\*/g, '$1')  // remove **bold**
          .replace(/^\* /gm, '• ')          // * → bullet point •
        }
        </p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-2xl shadow-sm">
            <p className="text-gray-400 text-sm">AI is thinking... 🤔</p>
          </div>
        </div>
      )}
    </div>

    {/* Input Area */}
    <div className="bg-white border-t p-4 flex gap-3">
      <input
        type="text"
        placeholder="Ask about your health..."
        className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
      onClick={handleSend}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">
        Send
      </button>
    </div>

  </div>
)
}

export default AIChat