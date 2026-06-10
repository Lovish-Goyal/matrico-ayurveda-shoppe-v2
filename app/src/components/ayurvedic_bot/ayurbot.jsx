import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api.js";
import styles from "./ayurbot.module.css";
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai";

const languages = {
  en: "English",
  hi: "हिन्दी",
};

const AyurvedaBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        language === "hi"
          ? "अपनी समस्या बताएं..."
          : "Hello! I am your Ayurvedic health assistant. Tell me your symptoms or concerns.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await api.consultAI(input, language);
      setMessages((prev) => [...prev, { sender: "bot", text: result.reply }]);
    } catch (err) {
      console.error("AI consult failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't fetch a response. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className={styles.chatToggleBtn}
          onClick={() => setIsOpen(true)}
          aria-label="Open Chatbot"
        >
          <AiOutlineMessage />
        </button>
      )}

      {isOpen && (
        <div className={styles.chatOverlay}>
          <div className={styles.chatHeader}>
            <h2>Ayurveda Assistant</h2>
            <div className={styles.chatHeaderRight}>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={styles.languageSelect}
              >
                {Object.entries(languages).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                className={styles.chatCloseBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close Chatbot"
              >
                <AiOutlineClose />
              </button>
            </div>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  msg.sender === "user" ? styles.user : styles.bot
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className={`${styles.message} ${styles.bot}`}>Typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              placeholder={
                language === "hi"
                  ? "अपनी समस्या बताएं..."
                  : "Describe your health issue..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              autoFocus
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AyurvedaBot;
