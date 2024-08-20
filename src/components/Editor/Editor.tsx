import AceEditor from "react-ace";
import {useState} from "react";
import styles from './Editor.module.css'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import {codeExamples} from "./Editor.data.tsx";
import {parse} from "../../utils/parse.ts";
import {useEventListsState, useEventLoopAnimationState} from "../../store/store.ts";

const codeByTitle = codeExamples.reduce((acc, {title, code}) => {
  acc[title] = code;
  return acc;
}, {} as Record<string, string>);

function EditorComponent() {
  const [text, setText] = useState(codeExamples[0].code);
  const eventListsState = useEventListsState();
  const clearAnimationState = useEventLoopAnimationState(state => state.clear);
  const setAnimationState = useEventLoopAnimationState(state => state.setState);
  const enabled = useEventLoopAnimationState(state => state.immutable.enabled);

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedExample = codeByTitle[e.target.value];
    setText(selectedExample);
  }

  const onRun = () => {
    clearAnimationState();
    eventListsState.clear();
    const script = parse(text);
    eventListsState.set({
      list: 'task_queue',
      type: 'push',
      value: script,
    });
    setAnimationState(true, 'enabled');
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: 40,
        marginLeft: 20,
      }}>
        <div style={{marginBottom: 20, marginTop: 20}}>
          <label htmlFor="examples" style={{marginRight: 10}}>choose an example:</label>
          <select name="examples" onChange={onSelect}>
            {codeExamples.map(({title}) => (
              <option value={title} key={title}>{title}</option>
            ))}
          </select>
        </div>

        {!enabled && (
          <button onClick={onRun}>
            run code
          </button>
        )}

        {enabled && (
          <button onClick={() => {
            clearAnimationState();
            eventListsState.clear();
          }}>
            stop
          </button>
        )}
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