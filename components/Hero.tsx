import Image from 'next/image'

interface HeroProps {
  title: string
  subtitle?: string
  imageUrl?: string
  overlay?: boolean
  size?: 'full' | 'medium'
}

export default function Hero({
  title,
  subtitle,
  imageUrl,
  overlay = true,
  size = 'full',
}: HeroProps) {
  const heightClass = size === 'full' ? 'min-h-[90vh]' : 'min-h-[50vh]'

  return (
    <section className={`relative flex items-center justify-center ${heightClass} bg-green-900 overflow-hidden`}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      )}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      )}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-md">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
