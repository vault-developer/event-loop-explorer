import { useCallback, useState } from 'react';

function useBoolean(initialValue = false) {
	const [bool, setBool] = useState<boolean>(initialValue);
	const toggle = useCallback(() => setBool((prev) => !prev), []);

	return [bool, toggle] as const;
}

export default useBoolean;
