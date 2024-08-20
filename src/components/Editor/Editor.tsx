import AceEditor from "react-ace";
import React, {useState} from "react";
import styles from './Editor.module.css'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import {codeExamples} from "./Editor.data.tsx";
import {parse} from "../../utils/parse.ts";
import {useEventListsState, useEventLoopAnimationState} from "../../store/store.ts";
import Button from '@mui/material/Button';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

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
  const [example, setExample] = useState(codeExamples[0].title);

  const onSelect = (e: SelectChangeEvent) => {
    const example = e.target.value;
    const code = codeByTitle[example];
    setText(code);
    setExample(example);
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
        justifyContent: "space-between",
        alignItems: "center",
        gap: 40,
        marginLeft: 20,
        marginRight: 20,
      }}>
        <div style={{marginBottom: 20, marginTop: 20}}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-helper-label">example:</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              label="example"
              value={example}
              onChange={onSelect}
              variant="outlined"
             >
              {codeExamples.map(({title}) => (
                <MenuItem value={title} key={title}>{title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {!enabled && (
          <Button variant="contained" onClick={onRun}>
            run code
          </Button>
        )}

        {enabled && (
          <Button variant="contained" onClick={() => {
            clearAnimationState();
            eventListsState.clear();
          }}>
            stop
          </Button>
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