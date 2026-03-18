import { faComments, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const queryClient = useQueryClient();
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    const handleScroll = () => {
      /**
       * Công thức:
       * Khoảng cách tới đáy = tổng chiều cao - px đã scroll xuống - chièu cao khung
       *  distanceToBottom = scrollHeight - scrollTop - clientHeight;
       */
      const threshold = 50;

      // true: ở cuối chat - false: kéo lên đọc tin nhắn cũ
      const isBottom =
        chatContainer.scrollHeight -
          chatContainer.scrollTop -
          chatContainer.clientHeight <
        threshold;

      setIsAtBottom(isBottom);
    };
    chatContainer.addEventListener("scroll", handleScroll);
    return () => chatContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Xin chào! Tôi là trợ lý bán hàng. Tôi có thể giúp gì cho bạn?",
    },
  ]);
  useEffect(() => {
    // Nếu đang ở cuối chat
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (message) => {
      return await axios.post(`http://localhost:3001/api/search`, message);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries();
      console.log(data);
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại" },
      ]);
    },
  });

  const handleChatBot = () => {
    if (!inputMessage.trim()) return;
    const userMsg = { from: "user", text: inputMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    mutate({ messages: [...messages, userMsg] });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  console.log("inputMessage", isAtBottom);
  return (
    <>
      <button
        className={`fixed z-50 bottom-[100px] right-[20px] w-[60px] h-[60px] text-white border-none rounded-full cursor-pointer flex
            items-center justify-center text-[24px] shadow-2xl transition-all duration-300 ease-in-out z-[50] hover:scale-[1.1] hover:bg-[#1976d2]
            active:scale-95 bg-[#2196f3]`}
        onClick={() => setIsOpen(true)}
        aria-label="Mở chat"
      >
        <FontAwesomeIcon icon={faComments} />
      </button>
      {isOpen && (
        <div
          className={`fixed bottom-[90px] right-[20px] w-[350px] h-[500px] bg-[#ffffff] rounded-[12px] shadow-2xl flex
            flex-col overflow-hidden z-50 transition-all duration-10000 ease-in-out `}
        >
          <div
            className={`bg-[#2196f3] text-white py-[15px] px-[20px] border-b-[1px] border-solid flex justify-between items-center`}
          >
            <h2 className={`m-0 text-[20px] text-white font-semibold`}>
              Hỗ trợ người dùng
            </h2>
            <button
              className={`bg-none border-none text-white cursor-pointer text-[20px] p-[5px] flex items-center justify-center transition-transform duration-200 ease-in-out
            hover:scale-[1.1]`}
              onClick={() => setIsOpen(false)}
              aria-label="Đóng chat"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div
            ref={chatContainerRef}
            className={`flex flex-1 p-[20px] overflow-y-auto item- flex-col gap-[10px] bg-[#f5f5f5]`}
          >
            {messages?.map((item, index) => (
              <div
                key={index}
                className={`max-w-[80%] py-[10px] px-[15px] rounded-[15px]  mx-[5px] wrap-break-word 
                   ${item.from === "bot" ? "self-start bg-white text-[#333]  rounded-bl-[5px] shadow-2xl" : "self-end bg-[#2196f3] text-white  rounded-br-[5px] shadow-2xl"}                  `}
              >
                <div className={`text-sm `}>{item.text}</div>
                <div className={`text-sm `}>
                  {new Date().toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
            {!isAtBottom && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-[80px] right-[20px] bg-[#2196f3] text-white px-3 py-2 rounded-full shadow-lg hover:scale-105 transition"
              >
                ↓
              </button>
            )}
            <div ref={messagesEndRef} />

            {/* Dang loading */}
            {isPending && (
              <div className="flex justify-start message-slide">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-gray-600 bg-gray-200 rounded-full">
                    <MessageCircle size={16} />
                  </div>
                  <div className="px-4 py-3 bg-white border border-gray-200 rounded-bl-sm shadow-sm rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full "></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full "></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full "></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChatBot()
            }}
            className={`flex p-[15px] bg-white border-t-[1px] border-solid border-[#1B1B1B] gap-[10px]`}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Nhập tin nhắn của bạn..."
              className={`flex-1 py-[10px] px-[15px] border-solid border-[1px] border-[#e0e0e0] rounded-[20px] outline-none text-sm 
                focus:border-[#2196f3] disabled:bg-[#f5f5f5] disabled:cursor-not-allowed`}
              // disabled={isLoading}
            />
            <button
              onClick={handleChatBot}
              disabled={!inputMessage.trim()}
              className={`bg-[#2196f3] text-white border-none rounded-[20px] py-[10px] px-[20px] cursor-pointer font-medium transition-all duration-300 ease-in-out
            disabled:hover:bg-[#1976d2] disabled:active:scale-[0.98] disabled:bg-[#ccc] disabled:cursor-not-allowed`}
            >
              Gửi
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
