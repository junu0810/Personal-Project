import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
// import { javaLanguage } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'

import './App.css'

function App() {

  const jsFuction = `function solution(t,p) { 
    
}`

  const [code, setCode] = useState(jsFuction);
  const [result, setResult] = useState([]);



  const onChange = (e) => {
    setCode(e)
  }

  const runCode = async () => {
    console.log(code)
    await axios.post("http://localhost:8080", { "data": code })
      .then((result) => {
        console.log(result.data)
        setResult(result.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const markdown = `
## JavaScript 문제풀이 
#### 문제 
- 숫자로 이루어진 문자열 t와 p가 주어질 때, t에서 p와 길이가 같은 부분문자열 중에서, 이 부분문자열이 나타내는 \n 수가 p가 나타내는 수보다 작거나 같은 것이 나오는 횟수를 return하는 함수 solution을 완성하세요.
\n
- 예를 들어, t="3141592"이고 p="271" 인 경우, t의 길이가 3인 부분 문자열은 314, 141, 415, 159, 592입니다. 이 문자열이 나타내는 수 중 271보다 작거나 같은 수는 141, 159 2개 입니다.

#### 제한사항
1.  1 ≤ p의 길이 ≤ 18
2.  p의 길이 ≤ t의 길이 ≤ 10,000
3. t와 p는 숫자로만 이루어진 문자열이며, 0으로 시작하지 않습니다.
`

  const markdownExampel = `
 #### 출력 예시  
 
 입출력 예 설명 \n
 - 입출력 예 #1 \n
   p의 길이가 1이므로 t의 부분문자열은 "5", "0", 0", "2", "2", "0", "8", "3", "9", "8", "7", "8"이며  이중 7보다 작거나 같은 숫자는 "5", "0", "0", "2", "2", "0", "3", "7" 이렇게 8개가 있습니다. \n
 
- 입출력 예 #2\n
  p의 길이가 2이므로 t의 부분문자열은 "10", "02", "20", "03"이며, 이중 15보다 작거나 같은 숫자는 "10", "02", "03" 이렇게 3개입니다. "02"와 "03"은 각각 2, 3에 해당한다는 점에 주의하세요
 
 `

  return (
    <div>
      <div className='mainTitle'>[실습1] 소수 만들기</div>
      <div className='subTitle'>코딩테스트 - 소수만들기 </div>
      <div className='dashboard'>
        <div className='question'>
          <div className='problem'>
            <ReactMarkdown children={markdown} />
          </div>
          <div className='example'>
            <ReactMarkdown children={markdownExampel} />
          </div>
        </div>
        <div className='codingIDE'>
          <CodeMirror
            className='CodeMirror'
            lineNumber={true}
            value={code}
            height="60vh"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
            theme={okaidia}
            gutter={true}
          />
          <div className="BtnArea">
          <button onClick={runCode} className="runBtn" >실행</button>
          </div>
          {result.length === 0 ?
            <div>결과가 여기 표시됩니다.</div>
            :
            result.map((el) => {
              return el.state === 1 
              ?
              <div className='okele'>{el.desc}</div>
              :
              <div className='wrongele'>{el.desc}</div>
            })}
        </div>
      </div>
    </div>
  );
}
export default App;