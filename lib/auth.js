import React, { useState, useEffect, useContext, createContext } from "react"
import firebase from "./firebase"
import { createUser } from "./db"
import cookie from "js-cookie"
import Router from "next/router"

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const handleUser = rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser)
      const { token, ...userWithoutToken } = user

      createUser(user.uid, userWithoutToken)
      setUser(user)

      cookie.set("fast-feedback-auth", true, {
        expires: 200
      })

      return user
    } else {
      setUser(false)

      cookie.remove("fast-feedback-auth")

      return false
    }
  }
  const signinWithGitHub = () => {
    Router.push("/sites")

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(response => {
        handleUser(response.user)
      })
  }

  const signinWithGoogle = () => {
    Router.push("/sites")
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        handleUser(response.user)
      })
  }
  const signout = () => {
    Router.push("/")

    return firebase
      .auth()
      .signOut()
      .then(() => setUser(false))
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout
  }
}

const formatUser = user => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.ya,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  }
}
