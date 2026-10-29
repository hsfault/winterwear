import { useEffect, useRef, useState } from 'react'

export default function Pic({
  src,
  alt,
  className = '',
  imgClassName = '',
  style,
  eager = false,
}) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true)
  }, [src])

  return (
    <div className={`overflow-hidden bg-night-deep ${className}`}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        style={style}
      />
    </div>
  )
}