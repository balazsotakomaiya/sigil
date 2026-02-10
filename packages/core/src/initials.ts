export function extractInitials(name: string): string {
	const trimmed = name.trim();
	if (!trimmed) return '?';

	const parts = trimmed.split(/\s+/).filter(Boolean);

	if (parts.length === 1) {
		return parts[0].charAt(0).toUpperCase();
	}

	return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
