import AceEditor from "react-ace";
import {useState} from "react";
import styles from './Editor.module.css'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import {codeExamples} from "./Editor.data.tsx";
import {parse} from "../utils/parse.ts";

const codeByTitle = codeExamples.reduce((acc, {title, code}) => {
  acc[title] = code;
  return acc;
} , {} as Record<string, string>);

function EditorComponent() {
  const [text, setText] = useState(codeExamples[0].code);

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedExample = codeByTitle[e.target.value];
    setText(selectedExample);
  }

  const onRun = () => parse(text);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}>
        <div style={{marginBottom: 20, marginTop: 20}}>
          <label htmlFor="examples" style={{marginRight: 10}}>choose an example:</label>
          <select name="examples" onChange={onSelect}>
            {codeExamples.map(({title}) => (
              <option value={title} key={title}>{title}</option>
            ))}
          </select>
        </div>
        <button onClick={onRun}>
          run code
        </button>
      </div>
      <div style={{flex: 1}}>
        <AceEditor
          width={"100%"}
          value={text}
          height={"100%"}
          mode="javascript"
          theme="solarized_dark"
          setOptions={{
            useWorker: false,
          }}
          showPrintMargin={false}
          fontSize={16}
          onChange={setText}
          className={styles.editor}
        />
      </div>
    </div>
  );
}

export default EditorComponent;