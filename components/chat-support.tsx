"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Globe, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ChatSupportProps {
  language: string;
  guestData: any;
  onNavigate: (view: string) => void;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "staff" | "bot";
  timestamp: Date;
  translated?: boolean;
  originalText?: string;
}

// Use translation for quick questions
const quickQuestionsKeys = [
  "chat-support.chat.quickQuestions.wifi",
  "chat-support.chat.quickQuestions.breakfast",
  "chat-support.chat.quickQuestions.showers",
  "chat-support.chat.quickQuestions.bus",
];

export function ChatSupport({
  language,
  guestData,
  onNavigate,
}: Readonly<ChatSupportProps>) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t("chat-support.chat.greeting", {
        name: guestData?.firstName || t("chat-support.chat.guest"),
      }),
      sender: "bot",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [translationEnabled, setTranslationEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [staffTalkEnabled, setStaffTalkEnabled] = useState(false);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Keep only this simulateTranslation function (remove duplicates!)
  const simulateTranslation = (
    text: string,
    fromLang: string,
    toLang?: string
  ) => {
    if (!toLang || toLang === fromLang) return text;
    // You can keep your custom translation logic here if needed
    return text;
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

  setTimeout(() => {
      // Simulate bot response
      let botText = t("chat-support.chat.responses.botErrorResponse");

      // Map quick questions to their response keys
      const quickQuestions = [
        { questionKey: "chat-support.chat.quickQuestions.wifi", responseKey: "chat-support.chat.responses.wifi" },
        { questionKey: "chat-support.chat.quickQuestions.breakfast", responseKey: "chat-support.chat.responses.breakfast" },
        { questionKey: "chat-support.chat.quickQuestions.help", responseKey: "chat-support.chat.responses.help" },
        { questionKey: "chat-support.chat.quickQuestions.bus", responseKey: "chat-support.chat.responses.bus" },
        { questionKey: "chat-support.chat.quickQuestions.showers", responseKey: "chat-support.chat.responses.showers" }
      ];

      // Check if the user's message matches any translated quick question
      for (const { questionKey, responseKey } of quickQuestions) {
        const translatedQuestion = t(questionKey).toLowerCase();
        if (newMessage.toLowerCase().includes(translatedQuestion)) {
          botText = t(responseKey);
          break;
        }
      }

      let translatedText = botText;
      let originalText: string | undefined = undefined;

      if (translationEnabled && language !== "en") {
        translatedText = simulateTranslation(botText, "en", language);
        if (translatedText !== botText) {
          originalText = botText;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: translatedText,
        sender: staffTalkEnabled ? "staff" : "bot",
        timestamp: new Date(),
        translated: !!originalText,
        originalText,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickQuestion = (questionKey: string) => {
    setNewMessage(t(questionKey));
  };
  

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t("chat-support.chat.title")}</h2>
        <p className="text-muted-foreground">{t("chat-support.chat.subtitle")}</p>
        
        <Button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-1"
        >
          {t("chat-support.chat.back")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Headphones className="h-5 w-5" />
              {t("chat-support.chat.liveSupport")}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTranslationEnabled(!translationEnabled)}
                className="flex items-center gap-1"
              >
                <Globe className="h-3 w-3" />
                {translationEnabled
                  ? t("chat-support.chat.on")
                  : t("chat-support.chat.off")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={
                  () => {
                    
                    setStaffTalkEnabled((prev) => !prev)
                    const staffMessage: Message = {
                      id: messages.length + 1,
                      text: staffTalkEnabled ? t("chat-support.chat.staffConnected") : t("chat-support.chat.staffDisconnected"), 
                      sender: "staff",
                      timestamp: new Date(),

                    };
                    setMessages((prev) => [...prev, staffMessage]);
                    const botMessage: Message = {
                        id: messages.length + 1,
                        text: staffTalkEnabled ? t("chat-support.chat.botDisconnected") : t("chat-support.chat.botConnected"), 
                        sender: "bot",
                        timestamp: new Date(),

                      };
                      setMessages((prev) => [...prev, botMessage]);}
                }
                className="flex items-center gap-1"
              >
                <Headphones className="h-3 w-3" />
                {staffTalkEnabled
                  ? t("chat-support.chat.staffModeOn")
                  : t("chat-support.chat.staffModeOff")}
              </Button> 
              <Badge variant="secondary" className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {t("chat-support.chat.online")}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto space-y-3 p-3 bg-muted/30 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex-column w-fit ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {(() => {
                      if (message.sender === "user") {
                        return (
                          <User className="h-3 w-3" />
                        );
                      } else if (message.sender === "bot") {
                        return (
                          <Bot className="h-3 w-3" />
                        );
                      } else {
                        return (
                          <Headphones className="h-3 w-3 " />
                        );
                      }
                    })()}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.translated && (
                      <Globe className="h-3 w-3 opacity-70" />
                    )}
                  </div>
                  <div
                    className={`
                      mt-1 p-2 rounded-md text-sm whitespace-pre-wrap
                      ${
                        message.sender === "user"
                          ? "bg-gray-400 "
                          : message.sender === "bot"
                          ? "bg-blue-100"
                          : "bg-green-100"
                      }
                    `}
                  >
                    {message.text}
                  </div>
                  {message.originalText && (
                    <p className="text-xs opacity-60 mt-1 italic">
                      {t("chat-support.chat.original")}: {message.originalText}
                    </p>
                  )}
                </div>
            ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      {(() => {
                      if (!staffTalkEnabled) {
                        return (
                          <div>
                            <Bot className="h-3 w-3" />
                            <span className="text-xs">{t("chat-support.chat.botTyping")}</span>
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            <Headphones className="h-3 w-3 " />
                            <span className="text-xs">{t("chat-support.chat.staffTyping")}</span>
                          </div>

                        );
                      }
                    })()}
                      
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder={t("chat-support.chat.typePlaceholder")}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button
                  onClick={sendMessage}
                  disabled={isTyping || !newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickQuestionsKeys.map((qKey, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(qKey)}
                    disabled={isTyping}
                  >
                    {t(qKey)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
