import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react';

const AutoLogin = () => {
    const params = useParams()
    const { signIn } = useAuth();

    const makeLogin = async () => {
        if (params.usertest === 'usertest') {
            const res= await signIn({ email: 'user@test.com', password: 'password' })
            console.log(res)
            return window.location.pathname = '/'
        }
        return window.location.pathname= '/login'
    }
    useEffect(()=>{
        makeLogin()
    }, [])
}

export default AutoLogin
