import { useState, useEffect } from "react";
import InputName from "../components/InputName";

const Home = () => {
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");
  const [hasName, setHasName] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
      setHasName(true);
    }
  }, []);

  const handleSubmit = () => {
    if (inputName.trim()) {
      localStorage.setItem("userName", inputName.trim());
      setName(inputName.trim());
      setHasName(true);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "pagi";
    if (hour < 18) return "siang";
    return "malam";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {hasName ? (
        <p className="text-center text-4xl">
          Selamat {getGreeting()}, {name}! Have a nice day.
        </p>
      ) : (
        <InputName
          inputName={inputName}
          setInputName={setInputName}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Home;
