import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Firebase from 'firebase'

export default function Home() {
  const [doc, setDoc] = useState(null)
  const [name, setName] = useState(null)

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    }

    Firebase.initializeApp(firebaseConfig)
  }, [])

  // const getData = () => {
  //   if (!name) {
  //     const db = Firebase.firestore()

  //     const docRef = db
  //       .collection('students')
  //       .doc('studentsData')

  //     setDoc(docRef)

  //     docRef
  //       .get()
  //       .then((doc) => {
  //         if (doc.exists) {
  //           doc.data().studentsData.map((student) => {
  //             if (student.name.toLowerCase().includes('Marcos'.toLocaleLowerCase())) {
  //               setName(student.name)
  //             }
  //           })
  //         } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!")
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Error getting document:", error)
  //       })
  //   }
  // }

  useEffect(() => {
    if (doc && name) {
      const studentId = 1
      let newDoc

      console.log(name)

      doc.studentsData.map((student) => {
        newDoc = Object.assign({}, student)

        if (newDoc.id === studentId) {
          newDoc.name = name
        }

        return newDoc
      })

      Firebase
        .firestore()
        .collection('students')
        .doc('studentsData')
        .update({studentsData: [newDoc]})
    }
  }, [doc])

  const postData = () => {
    Firebase
      .firestore()
      .collection('students')
      .doc('studentsData')
      .get()
        .then((doc) => {
          if (doc.exists) {
            setDoc(doc.data())
          }
        })
        .catch((error) => {
          console.log('Error postData', error)
        })
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to <a href="https://nextjs.org">Next.js!</a></h1>

        {/* <div className="get">
          <p><button onClick={getData}>Pegar dado</button> {'teste'}</p>
        </div> */}

        <div className="post">
          <p><input type="text" onChange={(event) => setName(event.target.value)} /><button  onClick={postData}>Enviar dado</button></p>
        </div>

      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  )
}
