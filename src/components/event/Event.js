import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Event = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const auth = useContext(AuthContext);
  const [status, setStatus] = useState(null);
  const [initialLoadError, setInitialLoadError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState({ title: undefined, text: undefined });
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.getToken()}`,
  };
  const url = `http://localhost:8000/api/event`;

  useEffect(() => {
    if (id)
      fetch(`${url}/${id}`)
        .then((res) => res.json())
        .then(
          (res) => {
            setPost(res);
            setIsLoaded(true);
          },
          (err) => {
            setInitialLoadError(err);
            setIsLoaded(true);
          }
        );
    else setIsLoaded(true);
  }, [id, url]);

  const createItem = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: hs,
      body: JSON.stringify(post),
    }).then(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          setStatus({ message: res.statusText });
          navigate("/events");
        } else if (res.status === 401) {
          setStatus({ message: res.statusText });
        } else if (res.status === 422) {
          setStatus({ message: res.statusText });
        }
      },
      (err) => {
        setStatus(err);
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (initialLoadError) {
    return <div>Error: {initialLoadError.message}</div>;
  } else {
    return (
      <div className="d-flex aligns-items-center justify-content-center mt-5" >
        <div className="card w-50" style={{ background: "rgba(43, 35, 35, 0.5)", color: 'white' }}>
          <div className="card-header text-white">
            Sukurti renginį
          </div>
          <div className="card-body" >
            <form onSubmit={(e) => (id, createItem(e))}>
              <div className="my-2 text-danger">
                {status === null ? "" : status.message}
              </div>
              <div className="form-group d-grid gap-2">
                <input
                  className="form-control"
                  onChange={(e) => setPost({ ...post, name: e.target.value })}
                  value={post.name ?? "Pavadinimas"}
                />
                <input
                  className="form-control"
                  onChange={(e) => setPost({ ...post, date: e.target.value })}
                  value={post.date ?? "Data"}
                />
                <input
                  className="form-control"
                  onChange={(e) => setPost({ ...post, description: e.target.value })}
                  value={post.description ?? "Aprašymas"}
                />
                <input
                  className="form-control"
                  onChange={(e) => setPost({ ...post, place: e.target.value })}
                  value={post.place ?? "Vieta"}
                />
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Event;