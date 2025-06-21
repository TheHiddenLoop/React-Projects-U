export function Blogs({ image, title, description }) {
  return (
    <div className="posts">
      <h1>{title}</h1>
      <img src={image} alt={title} />
      <p>{description}</p>
    </div>
  );
}
