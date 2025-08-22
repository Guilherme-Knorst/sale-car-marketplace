'use client';

import Image from "next/image";

export default function WhatsappButton({text }: { text: string }) {
	const urlEncodedText = encodeURIComponent(text);
	
	const callZap = () => {
		window.open(`https://wa.me/5551989421200?text=${urlEncodedText}`, '_blank');
	};
	
	return (
		<button
      type="button"
      onClick={callZap}
      aria-label="Conversar no WhatsApp"
      className="
        inline-flex items-center gap-2 rounded-lg
        border border-neutral-300 bg-white/70 px-3 py-2
        text-sm font-medium text-neutral-700 shadow-sm
        transition
        hover:bg-white
        focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400
        active:shadow 
      "
    >
      <Image
        src={"/images/apple.png"}
        alt=""
        width={28}
        height={28}
        className="shrink-0"
        priority={false}
      />
      <span>Tenho interesse</span>
    </button>
	);
}
