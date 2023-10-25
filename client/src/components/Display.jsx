import { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';

function Display({ turn }) {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    if(turn) {
      (async () => {
        const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/fetch`, {turn});
        setFileContent(data);
        return;
      })();
    }
  }, [turn]);
  
  return (
    <SyntaxHighlighter 
    language={`${turn}`} 
    style={anOldHope} 
    customStyle={{
      margin: "1vw",
      height: "85vh",
      width:"50vw"
    }}
    >
      {fileContent}
    </SyntaxHighlighter>
  );
}

export default Display;
