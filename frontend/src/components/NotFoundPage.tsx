export const NotFoundPage = () => {
  return (
    <div style={{ 
      textAlign: "center", 
      marginTop: "50px",
      padding: "20px",
      maxWidth: "500px",
      margin: "50px auto",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9"
    }}>
      <h1 style={{ color: "#e53e3e", marginBottom: "20px" }}>404 - Page Not Found</h1>
      <p style={{ marginBottom: "20px", fontSize: "18px" }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        style={{ 
          color: "white", 
          backgroundColor: "#3182ce",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
          display: "inline-block",
          fontWeight: "bold"
        }}
      >
        Go back to home page
      </a>
    </div>
  );
};