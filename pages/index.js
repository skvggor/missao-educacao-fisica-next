import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Firebase from 'firebase'

export default function Home() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [isLogged, setIsLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isWrongCredencial, setIsWrongCredencial] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    }

    Firebase.initializeApp(firebaseConfig)
  }, [])

  const login = () => {
    if (email && password) {
      setIsLoading(true)

      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      }

      Firebase
        .auth()
        .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
          .then(() => {
            return Firebase.auth().signInWithEmailAndPassword(email, password)
              .then((userCredential) => {
                setIsWrongCredencial(false)
                setIsLogged(true)
                setIsLoading(false)
                setIsDataLoaded(true)
              })
              .catch((error) => {
                if (error.code === 'auth/wrong-password'
                    || error.code === 'auth/user-not-found') {
                  setIsWrongCredencial(true)
                  setIsLoading(false)
                }

                console.error('signInWithEmailAndPassword error', error.code, error.message)
              })
          })
          .catch((error) => {
            console.error('setPersistence error', error.code, error.message)
          })
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to <a href="https://nextjs.org">Next.js!</a></h1>

        {!isDataLoaded &&
          <div>
            <p><label htmlFor="email">E-mail: </label><input id="email" type="text" onChange={(event) => setEmail(event.target.value)} /></p>
            <p><label htmlFor="senha">Senha: </label><input id="senha" type="password" onChange={(event) => setPassword(event.target.value)} /></p>
            <p><button onClick={login}>Entrar</button></p>
          </div>
        }

        {(isWrongCredencial && !isLoading) &&
          <p>E-mail ou senha inválidos.</p>
        }

        {isLoading &&
          <p>Carregando...</p>
        }

        {(!isLoading && isLogged) &&
          <img src="/cat.jpg" alt="logged" />
        }
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  )
}
