const FNV_OFFSET = 2166136261;
const FNV_PRIME = 16777619;

export function fnv1a(str: string): number {
	let hash = FNV_OFFSET;
	for (let i = 0; i < str.length; i++) {
		hash ^= str.charCodeAt(i);
		hash = Math.imul(hash, FNV_PRIME) >>> 0;
	}
	return hash >>> 0;
}

export function seeded(hash: number, index: number): number {
	let h = hash ^ (index * 2654435761);
	h = Math.imul(h ^ (h >>> 16), 2246822507);
	h = Math.imul(h ^ (h >>> 13), 3266489909);
	return (h ^ (h >>> 16)) >>> 0;
}
