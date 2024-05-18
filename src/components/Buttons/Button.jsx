const Button = ({className, children, onClick, type}) => {
    
  return (
    <button onClick={onClick} 
    className={`text-white text-base rounded-full hover:scale-105 transition-all ${className}`} 
    type={type}>{children}</button>
  )
}

export default Button
