import Link from "next/link"
import Image from "next/image"

interface HeaderLogoProps {
  name: string
}

export function HeaderLogo({ name }: HeaderLogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 rounded-lg p-1 sm:p-2 -ml-1 sm:-ml-2 touch-manipulation flex-shrink-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Image
        src="/Victoria_Park_Nails_Spa_Logo_Primary_small.png"
        alt={name}
        width={180}
        height={60}
        className="h-8 w-auto sm:h-10 lg:h-12 transition-all duration-200 dark:invert dark:brightness-110"
        priority
      />
    </Link>
  )
}
