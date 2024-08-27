import { useEffect, useRef } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

// https://github.com/pmndrs/zustand?tab=readme-ov-file#transient-updates-for-often-occurring-state-changes
function useRefState<T, K>(
	store: UseBoundStore<StoreApi<T>>,
	selector: (state: T) => K
) {
	const stateRef = useRef(selector(store.getState()));
	useEffect(
		() => store.subscribe((state) => (stateRef.current = selector(state))),
		[]
	);

	return stateRef;
}

export default useRefState;
