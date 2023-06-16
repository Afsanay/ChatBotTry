import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Navbar from "@/components/Navbar";

const API_URL = "https://api.pawan.krd/v1/chat/completions";

const SYSTEM_MESSAGE = "You are an assistant that helps users test their understanding of a topic by asking them multiple choice questions. The topic and difficulty level will be given to you, and you should reply with a single multiple choice question. The user will then reply with the answer, which could be a single character indicating the selected option or the full answer. If the answer is incorrect, simply mention that the answer is incorrect, and ask the user to try again. Don't reveal the correct answer or provide any explanation before the user has answered the question correctly.If the answer is correct, let the user know the answer is correct, provide a brief explanation, and then ask a new multiple choice question related to the same topic and repeat the process. Never ask the same question twice. Adjust the questions' difficultly based on the provided difficulty level."

export default function Quiz() {

    const [history,setHistory] = useState([{role:"system",content:SYSTEM_MESSAGE}]);
    const [topic,setTopic] = useState("");
    const [difficulty,setDifficulty] = useState("");
    const [userAns,setUserAns] = useState("");

    const sendPrompt = async () =>{
        if(!topic){
            alert("Provide a topic");
            return;
        }
        if(!difficulty){
            alert("Provide a difficulty");
            return;
        }
        const message = `The topic provided is ${topic} and the difficulty selected is ${difficulty}. Please start the quiz`
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

    return (
        <>
    <div className="flex flex-col h-screen">
            <Navbar/>
        {history.length <= 1 && 
            <div>
                <textarea placeholder="Topic" onChange={(e) => setTopic(e.target.value)}/>
                <textarea placeholder="Difficulty" onChange={(e) => setDifficulty(e.target.value)}/>
                <button onClick={sendPrompt}>StartQuiz</button>
            </div>
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
                <textarea className="border rounded-md text-lg p-2 flex-1" rows={1} value={userAns} placeholder="Type your query" onChange={(e) => setUserAns(e.target.value)} />
                <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 ml-2" onClick={sendRequest}>Click</button>
            </div>
        </>
        }
    </div>
    </>
    )
}