import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = ({ fetchUrl, immediate = true }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    (url = fetchUrl) => {
      setLoading("loading...");
      setData(null);
      setError(null);

      axios
        .get(url)
        .then((res) => {
          setLoading(false);
          setData(res?.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    },
    [fetchUrl]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, fetch: execute };
};

export default useFetch;
