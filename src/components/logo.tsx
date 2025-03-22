import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo: FC = () => {
  return (
    <Link href="/" className="flex items-center gap-1.5 text-amber-800 font-bold text-lg">
      <Image
        src="/hyper_teknoloji_logo.webp"
        alt="Hyper Teknoloji Logo"
        title="Hyper Teknoloji"
        width={120}
        height={50}
      />
    </Link>
  );
};

export default Logo;
