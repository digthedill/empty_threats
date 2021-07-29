import Image from 'next/image'

const HeroHead = () => {
  return (
    <div className="relative min-w-screen flex justify-center items-center cursor-pointer h-60">
      <Image
        alt="bg-tyedye"
        src="/swirls.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-60"
      />
      <h1 className="text-5xl sm:text-6xl md:text-8xl tracking-wide z-10">
        EMPTY THREATS
      </h1>
    </div>
  )
}

export default HeroHead
