'use client'

import { useEffect, useState } from "react";

interface UseFetchResult {
  data: any | null;
  isPending: boolean;
  isError: any | null;
}

export const useFetch = (url:string): UseFetchResult => {
  const [data, setData] = useState< any|null >(null);
  const [isPending, setIsPending] = useState< boolean >(true);
  const [isError, setIsError] = useState< any|null >(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then(respond => {
          if (!respond.ok) {
            throw Error('Error fetching table data');
          }
          return respond.json();
        })
        .then(data => {
          setData(data);
          setIsPending(false);
          setIsError(null);
        })
        .catch(error => {
          setIsPending(false);
          setIsError(error.message)
        });
    }, 1000);
  }, [url]);

  return { data, isPending, isError }
}