'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

const SignInPage: React.FC = () => {
    return (
        <div>
            <h1>Connexion</h1>
            <button onClick={() => signIn('keycloak')}>Se connecter</button>
        </div>
    );
};
export default SignInPage;
