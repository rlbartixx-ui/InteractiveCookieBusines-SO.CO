import React from 'react'

interface SectionHeadingProps {
  eyebrow: string
  centered?: boolean
  className?: string
  children?: React.ReactNode
}

export function SectionHeading({
  eyebrow,
  centered = false,
  className = '',
  children,
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <p
        className={`text-[0.68rem] sm:text-[0.7rem] tracking-[0.22em] sm:tracking-[0.35em] uppercase text-[#C9B59C] mb-4 flex items-center gap-2.5 sm:gap-3 ${centered ? 'justify-center' : ''
          }`}
      >
        <span className="inline-block w-5 sm:w-8 h-px bg-[#C9B59C] shrink-0" />
        <span className="truncate">{eyebrow}</span>
        {centered && <span className="inline-block w-5 sm:w-8 h-px bg-[#C9B59C] shrink-0" />}
      </p>
      {children}
    </div>
  )
}
