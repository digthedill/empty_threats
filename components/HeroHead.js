import Image from 'next/image'
import Link from 'next/link'

const HeroHead = () => {
  return (
    <Link href="/products">
      <div className="relative min-w-screen flex justify-center items-center cursor-pointer h-60">
        <Image
          alt="bg-tyedye"
          src="/banner.gif"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0 opacity-80"
        />
        <h1 className="text-5xl sm:text-6xl md:text-8xl tracking-wide z-10">
          EMPTY <br /> THREATS
        </h1>
      </div>
    </Link>
  )
}

export default HeroHead
