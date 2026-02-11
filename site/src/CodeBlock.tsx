import { type ReactNode, useState } from 'react';

type TokenType = 'keyword' | 'string' | 'comment' | 'fn' | 'tag' | 'attr' | 'punct' | 'plain';

interface Token {
	type: TokenType;
	value: string;
}

const KEYWORDS = new Set([
	'import',
	'from',
	'export',
	'const',
	'let',
	'function',
	'return',
	'type',
]);

function tokenize(code: string): Token[] {
	const tokens: Token[] = [];
	let i = 0;

	while (i < code.length) {
		// Comments
		if (code[i] === '/' && code[i + 1] === '/') {
			const end = code.indexOf('\n', i);
			const slice = end === -1 ? code.slice(i) : code.slice(i, end);
			tokens.push({ type: 'comment', value: slice });
			i += slice.length;
			continue;
		}

		// Strings (single and double quotes)
		if (code[i] === "'" || code[i] === '"') {
			const quote = code[i];
			let j = i + 1;
			while (j < code.length && code[j] !== quote) {
				if (code[j] === '\\') j++;
				j++;
			}
			tokens.push({ type: 'string', value: code.slice(i, j + 1) });
			i = j + 1;
			continue;
		}

		// JSX tags: <Word or </Word or />
		if (code[i] === '<') {
			const match = code.slice(i).match(/^<\/?([A-Z][a-zA-Z]*)/);
			if (match) {
				const isClosing = code[i + 1] === '/';
				tokens.push({ type: 'punct', value: isClosing ? '</' : '<' });
				i += isClosing ? 2 : 1;
				tokens.push({ type: 'tag', value: match[1] });
				i += match[1].length;
				continue;
			}
		}

		// JSX self-closing /> or closing >
		if (code[i] === '/' && code[i + 1] === '>') {
			tokens.push({ type: 'punct', value: '/>' });
			i += 2;
			continue;
		}

		if (code[i] === '>') {
			tokens.push({ type: 'punct', value: '>' });
			i += 1;
			continue;
		}

		// Words (identifiers / keywords)
		if (/[a-zA-Z_$]/.test(code[i])) {
			let j = i;
			while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
			const word = code.slice(i, j);

			if (KEYWORDS.has(word)) {
				tokens.push({ type: 'keyword', value: word });
			} else if (j < code.length && code[j] === '(') {
				tokens.push({ type: 'fn', value: word });
			} else {
				// Check if it's a JSX attribute (word followed by =)
				const rest = code.slice(j);
				if (rest[0] === '=') {
					tokens.push({ type: 'attr', value: word });
				} else {
					tokens.push({ type: 'plain', value: word });
				}
			}
			i = j;
			continue;
		}

		// Punctuation / operators / everything else
		tokens.push({ type: 'punct', value: code[i] });
		i++;
	}

	return tokens;
}

function tokenClass(type: TokenType): string | undefined {
	switch (type) {
		case 'keyword':
			return 'hl-kw';
		case 'string':
			return 'hl-str';
		case 'comment':
			return 'hl-cmt';
		case 'fn':
			return 'hl-fn';
		case 'tag':
			return 'hl-tag';
		case 'attr':
			return 'hl-attr';
		default:
			return undefined;
	}
}

export function CodeBlock({ code, className }: { code: string; className?: string }) {
	const [copied, setCopied] = useState(false);
	const tokens = tokenize(code);
	const elements: ReactNode[] = [];

	for (let i = 0; i < tokens.length; i++) {
		const t = tokens[i];
		const cls = tokenClass(t.type);
		if (cls) {
			elements.push(
				<span key={i} className={cls}>
					{t.value}
				</span>,
			);
		} else {
			elements.push(t.value);
		}
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className={`code-block-wrap ${className ?? ''}`}>
			<button type="button" className="code-copy-btn" onClick={handleCopy} aria-label="Copy code">
				{copied ? (
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img">
						<title>Copied</title>
						<polyline points="20 6 9 17 4 12" />
					</svg>
				) : (
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img">
						<title>Copy</title>
						<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
						<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
					</svg>
				)}
			</button>
			<pre className="code-block">
				<code>{elements}</code>
			</pre>
		</div>
	);
}
