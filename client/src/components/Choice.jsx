import { useState } from "react";

function Choice({languages, choice, addLang}) {
    const [input, setInput] = useState("");
    const handleSelect = (e) => {
        const language = e.target.value;
        if(e.key === 'Enter' && languages.includes(language)) {
            setInput("");
            addLang(language);
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
            className="bg-gray-800 border text-xl rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        />
        <datalist 
            id="language"
            className="bg-blue-600"
        >
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