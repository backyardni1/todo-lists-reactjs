import { CSSTransition } from 'react-transition-group';
import useFetch from '../../hooks/useFetch';
export default function AjaxCall() {
  const { data: posts, isLoading } = useFetch(
    'https://www.reddit.com/r/aww.json'
  );

  return (
    <div>
      {isLoading && <p>Please wait fetching data...</p>}
      <CSSTransition in={!isLoading} timeout={300} classNames="todo-lists">
        <ul>
          {posts &&
            posts.data.children.map((children) => (
              <li key={children.data.id}>{children.data.title}</li>
            ))}
        </ul>
      </CSSTransition>
    </div>
  );
}
