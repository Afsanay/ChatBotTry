import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from "@/components/Navbar";
import Head from "next/head";

const API_URL = "https://api.pawan.krd/v1/chat/completions";

const SYSTEM_MESSAGE = "I want you to act as an interviewer. The user will be the candidate and you will ask the user interview questions for the given position.I want you to only reply as the interviewer. Do not write all the questions at once. I want you to only do the interview with me. Ask me the questions and wait for the user's answers. Do not write explanations.Ask the user questions one by one like an interviewer does and wait for the user's answers."
export default function Mock() {

    const [history,setHistory] = useState([{role:"system",content:SYSTEM_MESSAGE}]);
    const [topic,setTopic] = useState("");
    // const [difficulty,setDifficulty] = useState("");
    const [userAns,setUserAns] = useState("");

    const sendPrompt = async () =>{
        if(!topic){
            alert("Provide a topic");
            return;
        }
        const message = `The position provided is ${topic}. Please start the interview`
        const upmess = [
            ...history,
            {
              role: "user",
              content: message,
            },
          ];
        setHistory(upmess);
        try{
        const response = await fetch(API_URL,{
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
              "Authorization": "Bearer pk-jdLDAvPgJzeEupRRYbtCKEPnVzqjyXvDBrjAqVfTXDnkRrst"
            },
            body:JSON.stringify({
              model:"gpt-3.5-turbo",
              messages:upmess,
            }),
          });
          const resJson = await response.json();
          
          const botMess = resJson.choices[0].message;
          const updatedMessages2 = [...upmess,botMess];
          setHistory(updatedMessages2);
        }
        catch(error){
          window.alert("Error Occurred. Please input again");
      }
    }

    const handleKeyDown = (e) => {
      if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault();
        sendRequest();
      }
    };

    const sendRequest = async () => {
        if(!userAns){
            alert("Please Give an Answer");
            return;
        }
        const upmess = [
            ...history,
            {
              role: "user",
              content: userAns,
            },
          ];
        setHistory(upmess);
        setUserAns("");
        try{
        const response = await fetch(API_URL,{
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
              "Authorization": "Bearer pk-jdLDAvPgJzeEupRRYbtCKEPnVzqjyXvDBrjAqVfTXDnkRrst"
            },
            body:JSON.stringify({
              model:"gpt-3.5-turbo",
              messages:upmess,
            }),
          });
          const resJson = await response.json();
          const botMess = resJson.choices[0].message;
          const updatedMessages2 = [...upmess,botMess];
          setHistory(updatedMessages2);
        }
        catch(error){
          window.alert("Error Occurred. Please input again");
      }
    }

    return (
<>
<Head>
      <title>ChatVision</title>
    </Head>
    <div className="flex flex-col h-screen">
            <Navbar/>
        {history.length <= 1 && 
            <>
            <h1 className=" text-4xl font-extrabold mb-4 leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Quiz Master</h1>
            <div className="mx-auto w-full max-w-screen-md px-4 pt-0 pb-2 flex">
                <textarea className="border w-fit rounded-md text-lg p-2 flex-1" placeholder="Position" rows={1} onChange={(e) => setTopic(e.target.value)}/>
                <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 ml-2" onClick={sendPrompt}>Start Interview</button>
            </div>
          </>
        }
        {history.length > 1 && 
        <>
        <div className="flex-1 overflow-y-scroll">
            <div className="w-full max-w-screen-md mx-auto px-4">
            {history
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
                <textarea className="border rounded-md text-lg p-2 flex-1" rows={1} value={userAns} onKeyDown={handleKeyDown} placeholder="Type your response" onChange={(e) => setUserAns(e.target.value)} />
                <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 ml-2" onClick={sendRequest}>Click</button>
            </div>
        </>
        }
    </div>
    </>
    )
}