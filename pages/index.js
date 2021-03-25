import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Firebase from 'firebase'

export default function Home() {
  const [firstStudent, setFirstStudent] = useState(null)

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    }
    // Initialize Firebase
    Firebase.initializeApp(firebaseConfig)

    const db = Firebase.firestore()

    const docRef = db
      .collection('students')
      .doc('studentsData')

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data().studentsData)

          doc.data().studentsData.map((student) => {
            if (student.name.toLowerCase().includes('Marcos'.toLocaleLowerCase())) {
              setFirstStudent(student.name)
            }
          })
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!")
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error)
      })
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to <a href="https://nextjs.org">Next.js!</a></h1>
        <p>Aluno: {firstStudent || 'Carregando...'}</p>
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  )
}
