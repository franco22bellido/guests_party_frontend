import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {

    const { isAuthenticated, clearSession } = useAuth()

    return (
        <header>


            <nav className="bg-white border-gray-200 dark:bg-gray-900 mb-5 lg:px-64">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GuestsParty</span>
                    </Link>
                    <ul className="flex flex-row p-0  mt-0 border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        {
                            isAuthenticated ?

                                <>
                                    <li>
                                        <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/scanQr" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">scanQr</Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => clearSession()} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Logout</Link>
                                    </li>
                                </>

                                :
                                <>
                                    <li>
                                        <Link to="/login" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Sign In</Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Sign Up</Link>
                                    </li>
                                </>
                        }

                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar


