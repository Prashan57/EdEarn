import React, { useEffect, useState } from "react";
// import { data } from "./component/arr";
// import { useNavigate } from "react-router";
import axios from "axios";

const Game = () => {
  const [fail, setFail] = useState(false);
  const [answer, setAnswer] = useState("");
  const [found, setFound] = useState(false);
  const [level, setLevel] = useState(2);
  const [flag, setFlag] = useState(0);
  const [data, setData] = useState([]);
  const correctAns = "Rose";
  // const navigate = useNavigate();
  const getData = async () => {
    const datas = await axios.get(
      `https://random-word-api.herokuapp.com/word?number=${level}`
    );
    console.log(datas.data);
    setData(datas.data);
    return 0;
  };
  const createFallingDiv = (i) => {
    const container = document.getElementById("container");
    const containerHeight = container.clientHeight;

    const fallingDiv = document.createElement("div");
    fallingDiv.className = "falling-div";
    fallingDiv.className = "absolute";
    fallingDiv.textContent = data[i];

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
    const container = document.getElementById("container");
    const containerHeight = container.clientHeight;
    container.innerHTML = "";
    const letsDO = async () => {
      await getData();
      for (let i = 0; i < level; i++) {
        setTimeout(() => {
          createFallingDiv(i);
        }, i * 500);
      }
    };
    letsDO();
  }, [level]);

  const handleNextLevel = (e) => {
    e.preventDefault();
    // if (fail === true) {
    setLevel(level + 1);
    setFail(false);
    setFound(false);
    const container = document.getElementById("container");
    container.innerHTML = ""; // Reset the container
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (correctAns.toLowerCase() === answer.toLowerCase() && !fail) {
      setFound(true);
    }
  };
  const handleNavigate = () => {
    setFail(false);
    setAnswer("");
    setFound(false);
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
      <div className="py-10">I am the creator</div>
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
        {data[0]}
        {fail && "fail"}
        {found && (
          <div className="absolute w-2/3 h-2/3 bg-black top-20 text-white">
            <h3>Success : {level}</h3>
            <br></br>
            {/* //{!fail ? ( */}
            {/* <p>Waiting...</p> */}
            {/* // ) : ( */}
            <button className="" onClick={(e) => handleNextLevel(e)}>
              Next Level
            </button>
            {/* // )} */}
          </div>
        )}
        {fail && (
          <div className="absolute w-2/3 h-2/3 bg-black top-20 text-white">
            <div>Game Over</div>
            <div>Level :{level}</div>
            <button onClick={handleNavigate}>Restart</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Game;
