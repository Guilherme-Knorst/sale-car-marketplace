import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="z-10 w-full sticky top-0 bg-gradient-to-r from-quaternary via-secondary to-quinary text-white p-6 shadow-lg">
        <nav className="w-[90%] xl:w-[70%] 2xl:w-[50%] mx-auto flex items-center gap-10">
          <Link href="/" className="hover:underline">
						<Image
							src="/images/logo-cropped.png"
							alt="Promoção"
							width={120}
							height={1}
							priority
						/>
					</Link>
          <Link href="/cadastro" className="hover:underline">Anunciar</Link>
        </nav>
    </header>
  );
}
