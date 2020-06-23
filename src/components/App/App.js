import React, { useState } from 'react';

function App() {
  let [jsonInput, setJsonInput] = useState('');
  let [jsonInputError, setJsonInputError] = useState('');
  let [jsonParsed, setJsonParsed] = useState(null);
  let [tableInput, setTableInput] = useState('');

  return (
    <div className="app-component">
      <div className="container-fluid">
        <div className="row tabs"></div>
        <div className="row">
          <div className="col-lg-6 p-15 json-in">
            <h1>Paste JSON here:</h1>
            <textarea
              value={jsonInput}
              onChange={(e) => handleJSONInputChange(e)}
              name="json-input"
              className="json-input"
              id="json-in"
              cols="30"
              rows="20"
            ></textarea>
          </div>
          <div className="col-lg-6 p-15 json-out">
            {!jsonParsed && <h1>Table will be here:</h1>}
            {jsonInputError && <span className="error">{jsonInputError}</span>}
            {jsonParsed && <h1>Here is Your Table:</h1>}
            {jsonParsed}
          </div>
        </div>
      </div>
    </div>
  );

  function handleJSONInputChange(e) {
    setJsonInput(e.target.value);

    if (!e.target.value) {
      setJsonInputError('');
      setJsonParsed(null);
      return;
    }

    let data;

    try {
      data = JSON.parse(e.target.value);
    } catch (error) {
      setJsonInputError(error.toString());
      return;
    }

    setJsonInputError('');
    setJsonParsed(createTable(flattenObject(data)));
  }

  function createTable(tableData) {
    if (!tableData) return;

    return (
      <table cellSpacing="0" cellPadding="0" className="json-output">
        <tbody>
          {(() => {
            return Object.keys(tableData).map((key, i) => {
              return (
                <tr key={`tr-${i}`}>
                  <td>{key}</td>
                  <td>{tableData[key]}</td>
                </tr>
              );
            });
          })()}
        </tbody>
      </table>
    );
  }

  function flattenObject(obj) {
    let flattened = {};

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(flattened, flattenObject(obj[key]));
      } else {
        flattened[key] = obj[key];
      }
    });

    return flattened;
  }
}

export default App;
