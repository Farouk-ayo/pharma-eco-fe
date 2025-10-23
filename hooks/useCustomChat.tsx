import { useState, useCallback } from "react";

// Define message types
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type UseCustomChatOptions = {
  initialMessages?: Message[];
  onError?: (error: Error) => void;
};

export const useCustomChat = (options: UseCustomChatOptions = {}) => {
  const { initialMessages = [], onError } = options;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!input.trim()) return;

      // Add user message to state
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input.trim(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        // Send the request to the API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Add assistant message to state
        setMessages((prev) => [
          ...prev,
          {
            id: data.id || Date.now().toString(),
            role: "assistant",
            content: data.content,
          },
        ]);
      } catch (error) {
        console.error("Error in chat request:", error);
        if (onError && error instanceof Error) {
          onError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [input, messages, onError]
  );

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    addMessage,
  };
};

export default useCustomChat;
