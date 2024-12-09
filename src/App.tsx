import { useState } from 'react';
import './App.css';
import { expand } from './code';

function App() {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [input, setInput] = useState("入力：");
  const [output, setOutput] = useState("出力：");
  const [outputError, setOutputError] = useState("");

  const compute = () => {
    setInput("");
    setOutput("");
    setOutputError("");
    try {
      if (inputA === "") throw Error("Aの入力が必要です");
      if (inputB === "") throw Error("Bの入力が必要です");
      if (!/^\d+(,\d+)*$/.test(inputA)) throw Error("Aには数列を入力してください");
      if (!/^\d+$/.test(inputB)) throw Error("Bには数を入力してください");
      const seq = inputA.split(",").map(x => parseInt(x)).filter(x => !isNaN(x));
      const n = parseInt(inputB);
      const inputString = `expand((${inputA}),${inputB})`
      const outputString = expand(seq,n);
      setInput(`入力：${inputString}`);
      setOutput(`出力：${outputString}`);
    } catch (error) {
      if (error instanceof Error) setOutputError(error.message);
      else setOutputError("不明なエラー");
      console.error("Error in compute:", error);
    }
  };

  return (
    <div className="app">
      <header>横ベクレミシェフ</header>
      <main>
        <p className="rdm">
          数列の入力は、任意の0 &lt; mに対して、a_0,a_1,...,a_&#123;m-1&#125;の形式で行ってください。<br />
        </p>
        A:
        <input
          className="input is-primary"
          value={inputA}
          onChange={(e) => setInputA(e.target.value)}
          type="text"
          placeholder="入力A"
        />
        B:
        <input
          className="input is-primary"
          value={inputB}
          onChange={(e) => setInputB(e.target.value)}
          type="text"
          placeholder="入力B"
        />
        <div className="block">
          <button className="button is-primary" onClick={() => compute()}>
            expand(A,B)
          </button>
        </div>
        <div className="box is-primary">
          {outputError !== "" ? (
            <div className="notification is-danger">{outputError}</div>
          ) : (
            <span>
              {input}<br />
              {output}
            </span>
          )}
        </div>
      </main>
      <footer>
        <a href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:%E7%AB%B9%E5%8F%96%E7%BF%81/%E6%A8%AA%E3%83%99%E3%82%AF%E3%83%AC%E3%83%9F%E3%82%B7%E3%82%A7%E3%83%95" target="_blank" rel="noreferrer">ユーザーブログ:竹取翁/横ベクレミシェフ | 巨大数研究 Wiki | Fandom</a>(2024/12/9 閲覧)<br />
        このページは<a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。<br />
      </footer>
    </div>
  );
}

export default App;