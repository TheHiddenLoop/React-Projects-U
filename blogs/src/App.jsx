import { useState, useEffect } from "react";
import "./App.css";
import { Blogs } from "./components/Blogs";
import { blogApi } from "./service/BlogApi";

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await blogApi(page); 
      setPosts((prev) => [...prev, ...res]);
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
  <div className="container">
    {posts.map((post, index) => (
      <Blogs
        key={`${post.id}-${index}`}
        title={post.title}
        image={post.thumbnail}
        description={post.description}
      />
    ))}

    {loading && (
      <div id="loader">
        <div className="spinner"></div>
      </div>
    )}
  </div>
);

}

export default App;
