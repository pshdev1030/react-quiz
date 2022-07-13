import { Dispatch, useCallback, useState } from "react";

function useUserSelect<T>(
  initialState: T
): [typeof initialState, Dispatch<any>, () => void] {
  const [value, setValue] = useState(initialState);

  const resetValue = useCallback(() => {
    setValue(initialState);
  }, []);

  return [value, setValue, resetValue];
}

export default useUserSelect;
