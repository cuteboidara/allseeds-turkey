import type { PortableTextBlock } from 'sanity'

interface Props {
  value: PortableTextBlock[]
  className?: string
}

export default function PortableText({ value, className = '' }: Props) {
  if (!value) return null

  return (
    <div className={`prose prose-green max-w-none ${className}`}>
      {value.map((block, i) => {
        if (block._type !== 'block' || !block.children) return null
        const text = (block.children as { text: string }[]).map(c => c.text).join('')
        const style = block.style || 'normal'

        if (style === 'h2') return <h2 key={i}>{text}</h2>
        if (style === 'h3') return <h3 key={i}>{text}</h3>
        if (style === 'h4') return <h4 key={i}>{text}</h4>
        if (style === 'blockquote') return <blockquote key={i}>{text}</blockquote>

        return <p key={i}>{text}</p>
      })}
    </div>
  )
}
