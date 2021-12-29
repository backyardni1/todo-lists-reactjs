import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((results) => {
        setData(results);
        setLoading(false);
      })
      .catch((error) => {
        if (error != null) {
          console.log('Something is not right');
        }
      });
  }, [url]);

  return { data, isLoading };
}

export default useFetch;
