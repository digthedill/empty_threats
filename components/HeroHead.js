import Image from 'next/image'
import Link from 'next/link'

const HeroHead = () => {
  return (
    <Link href="/products">
      <div className="relative min-w-screen flex justify-center items-center cursor-pointer h-60">
        <Image
          alt="bg-tyedye"
          src="https://res.cloudinary.com/dilldog-industries/image/upload/c_fill,g_auto,h_350,w_1080/v1628781028/empty-threats/empty-threats-banner_fkcmnw.gif"
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
