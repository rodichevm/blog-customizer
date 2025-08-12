import { useEffect } from 'react';
export function useOutSideClickClose<T extends HTMLElement>(
	isOpen: boolean,
	onChange: (value: boolean) => void,
	rootRef: React.RefObject<T>,
) {
	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				onChange(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onChange, rootRef]);
}
