import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2, Eye, EyeOff } from 'lucide-react';
import api from '../services/api';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/messages');
      setMessages(response.data);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/messages/${id}`);
        setMessages(messages.filter(m => m._id !== id));
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
        toast.success('Message deleted');
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-cyan mb-8">Messages</h1>

      {loading ? (
        <div className="text-center text-gray-400">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-400">No messages yet.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-slate-700 bg-slate-900">
              <h2 className="text-cyan font-semibold">Recent Messages</h2>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <button
                  key={msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left p-4 border-b border-slate-700 hover:bg-slate-700/50 transition ${
                    selectedMessage?._id === msg._id ? 'bg-cyan/10 border-l-2 border-l-cyan' : ''
                  }`}
                >
                  <p className="font-semibold text-white truncate">{msg.name}</p>
                  <p className="text-sm text-gray-400 truncate">{msg.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedMessage.name}</h2>
                    <p className="text-cyan">{selectedMessage.email}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {selectedMessage.phone && (
                  <div className="mb-4">
                    <label className="text-gray-400 text-sm">Phone</label>
                    <p className="text-white">{selectedMessage.phone}</p>
                  </div>
                )}

                <div>
                  <label className="text-gray-400 text-sm">Message</label>
                  <div className="bg-slate-900 p-4 rounded mt-2 text-white whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center text-gray-400">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
