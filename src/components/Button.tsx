'use client';

import { PropsWithChildren } from "react";

export default function Button({ onClick, children }: React.ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren) {
	return (
		<button
			onClick={onClick}
			className="border border-tertiary rounded p-4"
		>
			{children}
		</button>
	);
}
