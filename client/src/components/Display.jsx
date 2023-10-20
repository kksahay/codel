import { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function Display({ turn }) {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    if(turn) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFileContent(e.target.result);
      };
      fetch(`/../examples/${turn}.txt`)
        .then((res) => res.text())
        .then((data) => {
          reader.readAsText(new Blob([data]));
        })
        .catch((error) => console.log(error));
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
