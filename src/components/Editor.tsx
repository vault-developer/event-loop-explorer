import AceEditor from "react-ace";
import {useState} from "react";
import styles from './Editor.module.css'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";

function EditorComponent() {
  const [text, setText] = useState(`
    console.log(1);
    setTimeout(()=>console.log(2));
    console.log(3);
  `);

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
          <label htmlFor="cars" style={{marginRight: 10}}>choose an example:</label>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <button onClick={() => console.log(text)}>
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