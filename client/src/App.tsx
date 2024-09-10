import { useRef } from "react";
import useGemini from "./hooks/useGemini";
import Loading from "./components/Loading";
import { FormEvent } from "react";

const App = () => {
  const promptRef = useRef<HTMLInputElement>(null);
  const { loading, sendPrompt, isChatEmpty, getChatHistory } = useGemini();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!promptRef.current) return;
    console.log("submit");
    sendPrompt(promptRef.current.value);
    promptRef.current.value = "";
  };

  return (
    <div id="app" className="bg-neutral-800 text-white min-h-screen">
      <h1 className="text-4xl">Language Chatbot</h1>
      <form action="" onSubmit={handleSubmit}>
        <input ref={promptRef} className="text-black" type="text" />
        <button type="submit">Send prompt</button>
      </form>
      {loading && <Loading />}
      {!isChatEmpty() &&
        getChatHistory().map((message, index) => {
          return <div key={index}>{message.parts[0].text}</div>;
        })}
    </div>
  );
};

export default App;
