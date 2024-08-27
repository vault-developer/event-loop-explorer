import { useCallback, useState } from 'react';

function useBoolean(initialValue = false) {
	const [bool, setBool] = useState(initialValue);
	const setTrue = useCallback(() => setBool(true), []);
	const setFalse = useCallback(() => setBool(false), []);

	return [bool, setTrue, setFalse] as const;
}

export default useBoolean;
