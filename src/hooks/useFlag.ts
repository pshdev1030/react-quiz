import { useCallback, useState } from "react";

function useBoolean(initialState: boolean): [boolean, () => void, () => void] {
  const [value, setValue] = useState(initialState);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, setTrue, setFalse];
}

export default useBoolean;
