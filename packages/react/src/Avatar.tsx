import { avatar } from '@sigil-ts/gen';
import type { BorderRadius, StyleId } from '@sigil-ts/gen';
import { useMemo } from 'react';

export interface AvatarProps {
	name: string;
	style?: StyleId;
	size?: number;
	borderRadius?: BorderRadius;
	className?: string;
}

export function Avatar({ name, style = 'grain', size = 80, borderRadius, className }: AvatarProps) {
	const svg = useMemo(
		() => avatar(name, { style, size, borderRadius }),
		[name, style, size, borderRadius],
	);

	return (
		<span
			className={className}
			style={{ display: 'inline-block', width: size, height: size }}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: SVG is generated deterministically from name, no user input
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}
