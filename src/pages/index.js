import { useState } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const API_URL = "https://api.pawan.krd/v1/chat/completions";
const SYSTEM_MESSAGE = "You are ChatVision, an Artificial Intelligence ChatBot created by Priyanshu Sobti. You are one of the most intelligent chatbots out there and you are created using state of the art Machine Learning Models and APIs. You are helpful and savage with your answers at the same time. Give savage replies whenever you want. Generate a proper introduction for yourself everytime you are asked for.";


export default function Home() {

  const [userMess,setUserMess] = useState("");
  const [messages,setMessages] = useState([{role:"system",content:SYSTEM_MESSAGE}]);

  const handleKeyDown = (e) => {
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      sendRequest();
    }
  };

  // SEND REQUEST FUNCTION
  const sendRequest = async () => {
    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: userMess,
      },
    ];
    setMessages(updatedMessages);
    setUserMess("");

    const response = await fetch(API_URL,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Authorization": "Bearer pk-jdLDAvPgJzeEupRRYbtCKEPnVzqjyXvDBrjAqVfTXDnkRrst"
      },
      body:JSON.stringify({
        model:"gpt-3.5-turbo",
        messages:updatedMessages,
      }),
    });
    const resJson = await response.json();
    
    const botMess = resJson.choices[0].message;
    const updatedMessages2 = [...updatedMessages,botMess];
    setMessages(updatedMessages2);
  };
  // SEND REQUEST ENDS

  return (
    <>
    <div className="flex flex-col h-screen">
      <Navbar/>
      <div className="flex-1 overflow-y-scroll">
        <div className="w-full max-w-screen-md mx-auto p-4">
          {messages
          .filter((message) =>message.role !== "system")
          .map((message,idx) => (
            <div key = {idx} className="my-3">
              <div className="font-bold">{message.role === "user"?"You" : "ChatVision"}</div>
              <div className="text-lg prose">
                <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
            </div>
          ))}
        </div>
      </div>


        <div className="mx-auto w-full max-w-screen-md px-4 pt-0 pb-2 flex">
          <textarea className="border rounded-md text-lg p-2 flex-1" rows={1} onKeyDown={handleKeyDown} value={userMess} placeholder="Type your query" onChange={(e) => setUserMess(e.target.value)} />
          <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 ml-2" onClick={sendRequest}>Click</button>
        </div>
        <div className="grid grid-cols-3">
          <div>
            <Link href="/quiz_master" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">Click Here Quiz</Link>
          </div>
          <div>
          <Link href="/mock_interview" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">Click Here interview</Link>
          </div>
          <div>
          <Link href="/code_explainer" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">Click Here Code</Link>
          </div>
        </div>
      </div>
    </>
  )
}
