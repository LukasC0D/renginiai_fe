import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Events = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const url = `http://localhost:8000/api/event`;
  const auth = useContext(AuthContext);
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.getToken()}`,
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          setPosts(res);
          setIsLoaded(true);
        },
        (err) => {
          setError(err);
          setIsLoaded(true);
        }
      );
  }, []);

  const deletePost = (id, e) => {
    fetch(url + "/" + id, {
      method: "DELETE",
      headers: hs,
    }).then(
      (res) => {
        if (res.status === 200) {
          const remaining = posts.filter((p) => id !== p.id);
          setPosts(remaining);
        } else if (res.status === 401) {
          setError({ message: res.statusText });
        }
      },
      (err) => {
        console.log(err);
        setError(err);
        setIsLoaded(true);
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className='pt-4 mt-3 text-white'>
        <h1 className="text-center pb-5">Renginiai</h1>
        <table className="table text-white">
          <thead>
            <tr>
              <th>Pavadinimas</th>
              <th>Data</th>
              <th>Aprašymas</th>
              <th>Renginio_vieta</th>
              <th>User</th>
              {auth.getRole() === 2 || auth.getRole() === 1 ? (
                <th>
                  <span className="float-end mx-1">Veiksmai</span>
                </th>) :
                ("")
              }
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.name}</td>
                <td>{post.date}</td>
                <td>{post.description}</td>
                <td>{post.place}</td>
                <td>{post.user?.name}</td>
                {auth.getRole() === 2 || auth.getRole() === 1 ? (
                  <>
                    <td className="col-lg-1">
                      <button
                        onClick={(e) => deletePost(post.id, e)}
                        className="float-end btn  mx-1 position-relative btnColor"
                      >
                        Ištrinti
                      </button>
                    </td>
                  </>
                ) : (
                  ""
                )}
              </tr>
            ))}
            {auth.getRole() === 2 || auth.getRole() === 1 ? (
              <tr>
                <td
                  colSpan="6"
                  className="border border-3 border-start-0 border-bottom-0 border-end-0"
                >
                  <button
                    onClick={(e) => navigate(`/event/create`)}
                    className="btn btn  float-end mx-1 position-relative btnColor"
                  >
                    Pridėti renginį
                  </button>
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Events;