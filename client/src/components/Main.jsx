import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import Logo from "../assets/chat-bot.png";
import LoadingAnimation from "./Loading";
import axios from "axios";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const Main = () => {
  const textareaRef = useRef(null);
  const [user, setUser] = useState("User");
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const signout = useSignOut();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "You", text: input },
      ]);
      setInput("");
      setLoading(true);
      setTimeout(() => {
        const response = getResponse(input);
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: "ChatBot", text: response },
        ]);
        setLoading(false);
      }, 2000);
    }
  };

  const getResponse = (query) => {
    // API call for query response
    const response = "Sorry, Something went wrong. Please try again!";
    return response;
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleRating = (index, rating) => {
    const updatedMessages = messages.map((msg, i) =>
      i === index ? { ...msg, rating } : msg
    );
    setMessages(updatedMessages);

    const feedbackData = {
      user: user,
      question: messages[index - 1].text,
      response: messages[index].text,
      rating: rating,
    };

    saveFeedback(feedbackData);
  };

  const saveFeedback = async (feedbackData) => {
    // console.log("Saving feedback:", feedbackData);
    const response = await axios.post("http://localhost:5000/api/questions",{
      name: feedbackData.user,
      askedQuestion: feedbackData.question,
      answer: feedbackData.response,
      feedback: feedbackData.rating,
    }, {
      withCredentials: true, // Ensure cookies are sent
    });
    if (response.status === 201) {
      console.log(response.data);
    } else {
      console.log("Error", response.data);
    }
  };

  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [input]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <button className="text-gray-700 flex items-center">
          <ChevronLeftIcon width={32} name="Back" />
          Back
        </button>
        <div className="flex justify-around">
          <img src={Logo} width="64px" alt="DB chat" />
          <h2 className="text-center text-3xl font-extrabold my-auto mx-2">
            Chat Bot
          </h2>
        </div>
        <button
          onClick={toggleDropdown}
          className="text-gray-800 text-lg font-semibold"
        >
          <UserCircleIcon width={32} name="User Profile" />
        </button>
        {isOpen && (
          <div className="origin-top-right absolute right-8 mt-4 top-14 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                href="#settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Settings
              </a>
              <a
                onClick={() => {signout(); window.location.reload();}}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Logout
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl h-[65vh]">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Hello, <span className="text-purple-600">{user}</span> ask your query
        </h1>
        {/* Chat Messages */}
        <div className="flex flex-col space-y-4 w-full mb-6 text-sm overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col px-4">
              <div
                className={`mb-2 text-gray-700 font-semibold ${
                  msg.user === "You" ? "self-end" : ""
                }`}
              >
                {msg.user}:
              </div>
              <div
                className={`bg-gray-100 p-4 w-fit rounded-lg shadow ${
                  msg.user === "You" ? "self-end bg-blue-200" : "bg-gray-100"
                }`}
              >
                {msg.text.split("\n").map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
                {msg.user === "ChatBot" && (
                  <div className="self-end mt-4 flex justify-end">
                    <span className="text-gray-500 text-xs">
                      Rate this response:
                    </span>
                    <div className="flex items-center space-x-1 ml-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          onClick={() => handleRating(index, i + 1)}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 cursor-pointer ${
                            i < msg.rating ? "text-yellow-400" : "text-gray-400"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.287 3.982a1 1 0 00.95.69h4.205c.969 0 1.371 1.24.588 1.81l-3.41 2.49a1 1 0 00-.364 1.118l1.287 3.982c.3.921-.755 1.688-1.54 1.118l-3.41-2.49a1 1 0 00-1.176 0l-3.41 2.49c-.784.57-1.84-.197-1.54-1.118l1.287-3.982a1 1 0 00-.364-1.118l-3.41-2.49c-.783-.57-.38-1.81.588-1.81h4.205a1 1 0 00.95-.69l1.287-3.982z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && <LoadingAnimation />}
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex items-center w-full max-w-3xl mt-6 bg-white p-4 rounded-lg shadow-md">
        <textarea
          disabled={loading}
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          placeholder="Type your query..."
          className="flex-grow border-none focus:ring-0 resize-none overflow-hidden"
          rows={1}
        />
        <button onClick={handleSend} className="text-blue-500 ml-4">
          <PaperAirplaneIcon width={32} />
        </button>
      </div>
    </div>
  );
};

export default Main;
