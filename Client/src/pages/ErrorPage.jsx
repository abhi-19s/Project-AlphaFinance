import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";
import errorGif from "../assets/ErrorGIF.gif"; // Adjust the path if needed

export const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="error-page">
      <div className="image-container">
        <img src={errorGif} alt="Error Centered" className="centered-img" />
      </div>
      <div className="bottom-left-content">
        <h1>Page Not Found</h1>
        <button onClick={handleGoHome}>Go to Home</button>
      </div>
    </div>
  );
};
