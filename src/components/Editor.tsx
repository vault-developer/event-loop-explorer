import Editor from '@monaco-editor/react';
import {useRef} from "react";

// TODO: replace with ACE editor
// https://securingsincity.github.io/react-ace/
function EditorComponent() {
  const editorRef = useRef(null);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
      }}>
        <div>
          <label htmlFor="cars" style={{marginRight: 10}}>choose an example:</label>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <button
          onClick={() => console.log(editorRef.current!.getValue())}
          style={{marginBottom: 20}}
        >
          run code
        </button>
      </div>
      <div style={{flex: 1}}>
        <Editor
          theme={'vs-dark'}
          options={{
            minimap: {enabled: false} // Disable the minimap
          }}
          onMount={editor => editorRef.current = editor}
          defaultLanguage="javascript"
          defaultValue="setTimeout(()=>console.log(1), 500);"
        />
      </div>

    </div>

  );
}

export default EditorComponent;