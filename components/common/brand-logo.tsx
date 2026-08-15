import Image from "next/image"

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Image
      src="/apple-touch-icon.png"
      alt="Logo do Corrige-Me"
      width={192}
      height={192}
      sizes="48px"
      className={className}
      priority
    />
  )
}
