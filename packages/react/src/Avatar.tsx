import { useMemo } from 'react';
import { avatar } from 'sigil';
import type { StyleId } from 'sigil-core';

export interface AvatarProps {
	name: string;
	style?: StyleId;
	size?: number;
	className?: string;
}

export function Avatar({ name, style = 'grain', size = 80, className }: AvatarProps) {
	const svg = useMemo(() => avatar(name, { style, size }), [name, style, size]);

	return (
		<span
			className={className}
			style={{ display: 'inline-block', width: size, height: size }}
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}
