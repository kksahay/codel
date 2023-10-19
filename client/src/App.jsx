import React, { useEffect, useState } from "react"
import Display from "./components/Display"
import Choice from "./components/Choice"
import Modal from "./components/Modal"
import { SelectionProvider } from "./context/selectionContext";

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

  return (
    <SelectionProvider value={{configSelection}}>
      <div>
        <div>
          <Display turn={turn} />
        </div>
        <div>
          {choicesHistory.map((choice) => {
            return (
            <div key={choice.turn}>
              <button disabled>{choice.turn}</button>
              <Choice languages={languages} choice={choice} />
            </div>)
          })}
          {choicesHistory.length < 5 && !found ?
          (<div>
            <button disabled>{choicesHistory.length + 1}</button>
            <Choice languages={languages} />
          </div>) : <Modal success={found}/>}
        </div>
      </div>
    </SelectionProvider>
  )
}

export default App
