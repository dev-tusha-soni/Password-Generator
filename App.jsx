import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

    //useRef hook
    const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+:{}[]><.,/?";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  function copyToClipboard(){
    passwordRef.current.select();
    window.navigator.clipboard.writeText(Password);
  }

  return (
    <>
      <div className="password">
        <div className="row g-3 align-items-center ">
          <div className="col-auto">
            <label className="col-form-label option ">Password</label>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control w-100"
              aria-describedby="passwordHelpInline"
              value={Password}
              readOnly
              ref={passwordRef}
            />
          </div>

          <div className="col">
            <button type="button" onClick={copyToClipboard} className="btn btn-dark">
              Copy
            </button>
          </div>
        </div>
        <div className="special mt-4">
          <label className="form-label option ">Length of Password: {length}</label>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            className="form-range"
            id="customRange1"
          />
        </div>
        <div className="checkbox">
          <div className="num">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />

            <label className="form-label ms-2 option">Number</label>
          </div>
          <div className="num">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="form-label ms-2 option">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
