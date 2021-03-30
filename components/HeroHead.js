import Link from 'next/link'

const HeroHead = () => {
  return (
    <Link href="/">
      <div className="min-w-screen  flex flex-col items-center text-2xl cursor-pointer">
        <h1>EMPTY THREATS</h1>
        <img
          className="object-contain w-screen"
          src="https://res.cloudinary.com/dilldog-industries/image/upload/w_900,h_80,c_crop/v1612841663/caexyv8gihipsfs1ejyi.png"
          alt="hero logo"
        />
      </div>
    </Link>
  )
}

export default HeroHead
