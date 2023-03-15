import React, { useContext } from 'react'
import { AuthContext } from "./AuthContext";

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      {!auth.isLoggedin() ? (
        <>
          <h3 className='text-center pt-5 text-white'>
            <div>Sveiki</div><br /><div>Pirmiausia užsiregistruokite</div>
          </h3>
        </>
      ) : (
        auth.getRole() === 2 ? (
          <>
            <h1 className='text-center pt-5 text-success'>
              <div>Admin </div>
            </h1>
          </>
        ) : (
          <h1 className='text-center pt-5 text-primary'>
            <div>Naudotojas</div>
          </h1>
        )
      )
      }
    </>
  )
}

export default Home;