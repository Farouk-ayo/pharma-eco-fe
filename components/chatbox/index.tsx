import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Rocket } from "lucide-react";
import useCustomChat from "@/hooks/useCustomChat";
import Button from "../buttons";
import { formatTime } from "@/lib/util";
import LoadingIndicator from "../loadingSkeleton/loadingIndicator";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    addMessage,
  } = useCustomChat({
    initialMessages: [
      {
        id: "welcome-1",
        role: "assistant",
        content: "Welcome to PharmaEco!",
      },
      {
        id: "welcome-2",
        role: "assistant",
        content: "How can we help you today?",
      },
    ],
    onError: (error) => {
      console.error("Chat error:", error);
      addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, there was an error. Please try again later.",
      });
    },
  });

  const handleRegister = () => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: "Register With Us Now",
    };
    setMessages([...messages, userMessage]);

    // Simulate assistant response
    setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Great! You can register through our registration page. Would you like me to guide you through the process?",
      });
    }, 1000);
  };

  const handleLocations = () => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: "View Locations Near You",
    };
    setMessages([...messages, userMessage]);

    // Simulate assistant response
    setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content:
          "We have multiple PharmaEco locations across the country. To find the nearest location, please share your city or postal code.",
      });
    }, 1000);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    const messagesContainer = document.getElementById("chat-messages");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-[999]">
      {/* Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className="bg-primary text-white rounded-full shadow-lg"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        <Image
          src={isOpen ? "/cross.svg" : "/messages.svg"}
          alt={isOpen ? "close chat" : "chat"}
          width={60}
          height={60}
        />
      </motion.button>

      {/* Chatbox - Positioned with higher z-index than navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 md:bottom-[7.5rem] md:left-auto md:right-10 w-full md:w-[400px] h-[100vh] md:h-[500px] bg-white md:rounded-t-xl md:rounded-xl shadow-2xl flex flex-col overflow-hidden z-[999]"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <Link href={"/"}>
                <div className="relative flex items-center w-40 h-8">
                  <Image
                    src="/pharmabin-logo-w.svg"
                    alt="pharmabin"
                    className="w-full h-full object-contain"
                    layout="fill"
                  />
                </div>
              </Link>
              <button
                onClick={toggleChat}
                className="md:hidden text-white p-1 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div
              id="chat-messages"
              className="flex-1 overflow-y-auto p-4 bg-gray-50"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        <div className="bg-[#157D181F] rounded-full p-3 flex items-center justify-center">
                          <Image
                            src="/logo-pharmabin.svg"
                            alt="PharmaBin"
                            width={24}
                            height={24}
                          />
                        </div>
                      </div>
                      <div className="bg-[#157D181F] text-textPrimary rounded-lg p-3 max-w-[80%] shadow-sm">
                        <p className="text-sm md:text-base">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  )}
                  {message.role === "user" && (
                    <div className="bg-primary text-white rounded-lg p-3 max-w-[80%] shadow-sm">
                      <p className="text-sm md:text-base">{message.content}</p>
                      <span className="text-xs block text-right mt-1 opacity-70">
                        {formatTime(new Date())}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && <LoadingIndicator />}
              {messages.length <= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2 mt-2 block "
                >
                  <Button
                    onClick={handleRegister}
                    className=" !py-2 bg-white border  border-primary text-primary rounded-lg hover:bg-green-50 transition-colors text-base font-semibold  px-4 block ml-14"
                  >
                    Register With Us Now
                  </Button>
                  <Button
                    onClick={handleLocations}
                    className="!py-2 bg-white border  border-primary text-primary rounded-lg hover:bg-green-50 transition-colors text-base font-semibold  px-4 block ml-14"
                  >
                    View Locations Near You
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Input Box */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={handleMessageSubmit} className="flex relative">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white absolute right-1 top-1 p-2 rounded-md hover:bg-primary/90 transition-colors"
                  disabled={!input.trim() || isLoading}
                >
                  <Rocket className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbox;
