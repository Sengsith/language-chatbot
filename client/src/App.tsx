import useGemini from "./hooks/useGemini";
import Loading from "./components/Loading";

const App = () => {
  const { loading, sendPrompt, isChatEmpty, getChatHistory } = useGemini();

  const handleOnClick = () => {
    console.log("click");
    sendPrompt("I have 2 dogs in my house");
  };

  return (
    <div id="app" className="bg-neutral-800 text-white min-h-screen">
      <h1 className="text-4xl">Language Chatbot</h1>
      <button onClick={handleOnClick}>Send prompt</button>
      {loading && <Loading />}
      {!isChatEmpty() &&
        getChatHistory().map((message, index) => {
          return <div key={index}>{message.parts[0].text}</div>;
        })}
    </div>
  );
};

export default App;
