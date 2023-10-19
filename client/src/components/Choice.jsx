import { useState } from "react";
import { useSelection } from "../context/selectionContext"

function Choice({languages, choice}) {
    const { configSelection } = useSelection();
    const [input, setInput] = useState("");
    const handleSelect = (e) => {
        const language = e.target.value;
        if(e.key === 'Enter' && languages.includes(language)) {
            setInput("");
            configSelection(language);
        }
    }
    return (
    <>
        <input
        type="text" 
        list="language" 
        onChange={(e) => setInput(e.target.value)}
        value={choice ? choice.value : input}
        onKeyDown={handleSelect}
        disabled={choice ? choice.utilized : false}
        />
        <datalist id="language">
            {
                languages.map((language, id) => {
                    return <option key={id} value={language}>{language}</option>
                })
            }
        </datalist>
    </>
)
}
export default Choice