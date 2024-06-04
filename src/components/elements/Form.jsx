const Form = ({ onSubmit, className, children }) => {
  return (
    <form onSubmit={onSubmit} className={`mx-auto border p-6 w-full md:w-[500px] flex flex-col gap-1 ${className}`}>
      {children}
    </form>
  )
}

export default Form
