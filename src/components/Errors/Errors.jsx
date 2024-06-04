const Errors = ({errors=[]}) => {
  return (
    <>
      {
        errors &&
        errors.map((error, i)=> (
            <p className="text-red-600 font-semibold" key={i}>{error}</p>
        ))
      }
    </>
  )
}

export default Errors
