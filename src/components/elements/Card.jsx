const Card = ({className, children}) => {
  return (    
    <article className={`w-full md:w-[300px] md:h-[200px] border rounded flex flex-col gap-1 px-5 py-6 items-center ${className}`}>
        {children}
    </article>
  )
}

export default Card
