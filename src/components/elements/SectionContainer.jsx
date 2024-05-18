const SectionContainer = ({className, children}) => {
    return (
        <section className={`w-10/12 flex flex-row justify-center mx-auto flex-wrap gap-4 my-7 ${className}`}>
            {children}
        </section>
    )
}

export default SectionContainer
