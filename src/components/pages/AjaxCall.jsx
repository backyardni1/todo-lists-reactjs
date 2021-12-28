import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { CSSTransition } from 'react-transition-group';
export default function AjaxCall() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://www.reddit.com/r/aww.json')
      .then((response) => response.json())
      .then((results) => {
        setData(results.data.children);
        console.log(results.data.children);
      });
  }, []);

  return (
    <div>
      {data.length <= 0 && <p>Please wait fetching data...</p>}

      {/* {data.length > 0 && ( */}
      <div>
        <CSSTransition
          in={data.length > 0}
          timeout={300}
          classNames="todo-lists"
        >
          <ul>
            {data.map((children) => (
              <li key={children.data.id}>{children.data.title}</li>
            ))}
          </ul>
        </CSSTransition>
      </div>
      {/* )} */}
    </div>
  );
}
