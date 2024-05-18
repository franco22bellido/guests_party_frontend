const Card = ({className, children}) => {
  return (    
    <article className={`border rounded flex flex-col gap-1 px-16 py-6 items-center ${className}`}>
        {children}
    </article>
  )
}

export default Card
