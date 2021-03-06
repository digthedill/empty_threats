import Image from 'next/image'
import Link from 'next/link'

const HeroHead = () => {
  return (
    <Link href="/products">
      <div className="relative min-w-screen flex justify-center items-center cursor-pointer h-60">
        <Image
          alt="bg-tyedye"
          src="/loveless.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0 opacity-80"
        />
        <h1 className="text-7xl md:text-8xl tracking-wide z-10">
          EMPTY <br className="md:hidden" /> THREATS
        </h1>
      </div>
    </Link>
  )
}

export default HeroHead
