const App = () => {
  const handleOnClick = async () => {
    console.log("Connection test clicked.");
    try {
      const res = await fetch(import.meta.env.VITE_SERVER_URL);
      const data = await res.json();
      console.log("data:", data);
    } catch (error) {
      console.error("Error fetching backend:", error);
    }
  };

  return (
    <div id="app" className="bg-neutral-800 text-white min-h-screen">
      <h1 className="text-4xl">Language Chatbot</h1>
      <button onClick={handleOnClick}>Connection test!</button>
    </div>
  );
};

export default App;
