import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
export default function Login(){

    const { loginWithRedirect} = useAuth0();


    return (
        <button  
        className='btn btn-sm btn-danger rounded-3'
        onClick={() => { loginWithRedirect() }}>
            <i class="fas fa-user-circle me-2"></i>
            Ingresar
        </button>
    )
}