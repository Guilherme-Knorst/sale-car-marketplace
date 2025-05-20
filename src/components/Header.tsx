import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="z-10 w-screen fixed bg-gradient-to-r from-quaternary via-secondary to-quinary text-white py-4 px-6 shadow-lg">
      <div className="w-[90%] xl:w-[70%] 2xl:w-[50%] mx-auto flex justify-between items-center">
				<Image
					src="/images/logo-cropped.png"
					alt="Promoção"
					width={120}
					height={1}
					priority
				/>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">Início</Link>
          <Link href="/cadastro" className="hover:underline">Anunciar</Link>
        </nav>
      </div>
    </header>
  );
}
