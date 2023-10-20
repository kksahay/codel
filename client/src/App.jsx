import React, { useEffect, useState } from "react"
import Display from "./components/Display"
import Choice from "./components/Choice"
import { SelectionProvider } from "./context/selectionContext";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [languages, setLanguages] = useState([]);
  const [turn, setTurn] = useState(null);
  const [found, setFound] = useState(false);
  const [choicesHistory, setChoicesHistory] = useState([
    // {
    //   turn: 1,
    //   value: 'Go',
    //   utilized: true
    // },
    // {
    //   turn: 2,
    //   value: 'Python',
    //   utilized: true
    // }
  ]);
  const configSelection = (language) => {
    addLang(language);
  }

  async function getItems() {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/get`, {
        method: "GET",
      });
      const data = await response.json();
      const responseLanguages = data.languages.sort();
      const responseTurn = data.turn;
      sessionStorage.setItem("languages", JSON.stringify(responseLanguages));
      sessionStorage.setItem("turn", JSON.stringify(responseTurn));
      setTurn(responseTurn);
      setLanguages([...languages, ...responseLanguages]);
  };

  useEffect(() => {
    const languageData = JSON.parse(sessionStorage.getItem("languages"));
    const turnData = JSON.parse(sessionStorage.getItem("turn"));
    if(languageData && languageData.length > 0) {
      setLanguages([...languages, ...languageData]);
      setTurn(turnData);
    } else {
      getItems();
    }
  }, []);

  const addLang = (selection) => {
    if(selection) {
      if(selection === turn) {
        setFound(true);
      }
      setChoicesHistory((prevChoice) => {
        const newChoice = {
          turn: prevChoice.length + 1,
          value: selection,
          utilized: true,
        }
        console.log(newChoice)
        return [...prevChoice, newChoice];
      });
    }
  }

  const checker = () => {
    if(found) {
      toast.success(`Congratulations! ${turn} is correct`)
    } else {
      toast.error(`Correct Answer is ${turn}`)
    }
  }

  return (
    <SelectionProvider value={{configSelection}}>
      <Toaster />
      <div className="flex flex-col h-screen bg-black">
        <div className="min-h-fit text-4xl text-center p-4 font-black font-mono text-white bg-black">
          CODEL
        </div>
        <div className="flex flex-row h-screen">
          <div className="basis-1/2 bg-gray-900 self-center rounded-xs ml-2">
            <Display turn={turn} />
          </div>
          <div className="basis-1/2 py-20">
            {choicesHistory.map((choice) => {
              return (
              <div className="flex mb-5 justify-center" key={choice.turn}>
                <div className="mr-2 w-10 self-center text-center">
                   {
                    choice.value !== turn ? (
                        <div className="text-md">&#10060;</div>
                    ) : (
                      <div className="text-md">✅</div>
                    )
                   }
                </div>
                <div>
                  <Choice languages={languages} choice={choice} />
                </div>
              </div>)
            })}
            {choicesHistory.length < 5 && !found ?
            (<div className="flex justify-center">
              <div className="mr-2 w-10 self-center text-center">
                  <div className="text-2xl font-mono text-white font-black">{choicesHistory.length + 1}</div>
              </div>
              <div>
                  <Choice languages={languages}/>
              </div>
            </div>) : checker()}
          </div>
        </div>
      </div>
    </SelectionProvider>
  )
}

export default App
