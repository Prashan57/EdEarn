import React, { useEffect, useState } from "react";
import axios from "axios";

const Game = () => {
  const [fail, setFail] = useState(false);
  const [answer, setAnswer] = useState("");
  const [found, setFound] = useState(false);
  const [level, setLevel] = useState(2);
  const [data, setData] = useState([]);
  const [correctAns, setCorrectAns] = useState("");
  const [meaning, setMeaning] = useState("");

  const createFallingDiv = (word) => {
    const container = document.getElementById("container");
    const containerHeight = container.clientHeight;

    const fallingDiv = document.createElement("div");
    fallingDiv.className = "falling-div";
    fallingDiv.className = "absolute";
    fallingDiv.textContent = word;

    let startX = Math.random() * (container.clientWidth - 100);
    const startPosition = 0;
    fallingDiv.style.transform = `translate(${startX}px,${startPosition}px);`;

    container.appendChild(fallingDiv);

    function fallDown() {
      let currentPosition = startPosition;

      const fallInterval = setInterval(() => {
        currentPosition += 1;
        fallingDiv.style.transform = `translate(${startX}px,${currentPosition}px)`;
        setFail(false);
        if (found) {
          clearInterval(fallInterval);
        }
        if (currentPosition > containerHeight - 20) {
          if (fallingDiv.textContent.toLowerCase() === correctAns.toLowerCase())
            setFail(true);

          clearInterval(fallInterval);
        }
      }, 16);
    }

    setTimeout(() => {
      fallDown();
    }, Math.random() * 4000 + 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://random-word-api.herokuapp.com/word?number=${level}`
        );
        setData(response.data);
        // Create falling divs after data is fetched
        response.data.forEach((word, index) => {
          setTimeout(() => {
            createFallingDiv(word);
          }, index * 500);
        });
        const value = Math.round(Math.random() * level);
        setCorrectAns(response.data[value]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [level]);

  useEffect(() => {
    const findMeaning = async () => {
      try {
        if (correctAns !== "") {
          const meaning = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${correctAns}`
          );
          setMeaning(meaning.data[0].meanings[0].definitions[0].definition);
        }
      } catch (err) {
        console.log(err);
      }
    };
    findMeaning();
  }, [correctAns]);

  const handleNextLevel = () => {
    setLevel(level + 1);
    setFail(false);
    setFound(false);
    setData([]); // Clear previous data
  };

  const handleRestart = () => {
    setFail(false);
    setAnswer("");
    setFound(false);
    setData([]); // Clear previous data
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (correctAns.toLowerCase() === answer.toLowerCase() && !fail) {
      setFound(true);
    }
  };

  return (
    <div className="flex items-center pt-10 flex-col">
      {"level:" + level}
      <div className="w-4/5 text-center">
        <div
          className="bg-slate-300 h-40rem w-full rounded-2xl relative"
          id="container"
        ></div>
      </div>
      <div className="py-10">{meaning}</div>
      <form
        className="flex justify-center gap-4 w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className="w-2/3 h-10 rounded-2xl text-xl border border-solid border-black border-2 px-10"
          onChange={(e) => setAnswer(e.target.value)}
        ></input>
        <button className="bg-black text-white text-2xl font-bold rounded-2xl w-32">
          Go
        </button>
        {fail && "fail"}
        {found && (
          <div className="absolute w-2/3 h-2/3 bg-black top-20 text-white">
            <h3>Success : {level}</h3>
            <button onClick={handleNextLevel}>Next Level</button>
          </div>
        )}
        {fail && (
          <div className="absolute w-2/3 h-2/3 bg-black top-20 text-white">
            <div>Game Over</div>
            <div>Level: {level}</div>
            <button onClick={handleRestart}>Restart</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Game;
