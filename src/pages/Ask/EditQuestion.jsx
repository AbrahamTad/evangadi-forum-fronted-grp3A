import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../Api/axiosConfig";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const EditQuestion = () => {
  const { questionId } = useParams(); // Extract the question ID from the URL parameters
  const navigate = useNavigate(); // Hook to navigate between pages
  const { t } = useTranslation(); // Translation hook for multi-language support

  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [loading, setLoading] = useState(false); // Loading state

  const token = localStorage.getItem("token"); // Retrieve user's token from local storage

  // Fetch the question details when the component is mounted
  useEffect(() => {
    async function fetchQuestion() {
      setLoading(true); // Start loading
      try {
        const { data } = await axios.get(`/questions/${questionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(data.question.title);
        setDescription(data.question.description);
      } catch (error) {
        setErrorMessage(t("home.errorFetchingQuestion"));
      } finally {
        setLoading(false); // End loading
      }
    }

    if (token) {
      fetchQuestion(); // Fetch question details if token is available
    } else {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [questionId, token, navigate, t]);

  // Handle form submission to update the question
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true); // Start loading
    try {
      const updatedQuestion = { title, description };
      await axios.put(`/questions/${questionId}`, updatedQuestion, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage(t("home.questionUpdatedSuccessfully")); // Set success message

      // Redirect after 2 seconds
      setTimeout(() => navigate("/home"), 2000); // Redirect to home after 2 seconds
    } catch (error) {
      console.error("Error updating question:", error);
      setErrorMessage(t("home.errorUpdatingQuestion"));
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div className="container my-4">
      {/* Page title */}
      <h2>{t("home.editQuestion")}</h2>

      {/* Display loading spinner */}
      {loading && (
        <div className="spinner-border text-primary" role="status"></div>
      )}

      {/* Display error message if any */}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      {/* Display success message */}
      {successMessage && (
        <div className="text-success mb-3">{successMessage}</div>
      )}

      {!loading && (
        <form onSubmit={handleSubmit}>
          {/* Input for question title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              {t("home.title")}
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Textarea for question description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              {t("home.description")}
            </label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          {/* Action button */}
          <button type="submit" className="btn btn-success">
            {t("home.updateQuestion")}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditQuestion;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../../Api/axiosConfig";
// import { useTranslation } from "react-i18next";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

// const EditQuestion = () => {
//   const { questionId } = useParams(); // Get the question ID from URL
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const { t } = useTranslation(); // Translation hook

//   // Fetch the question details by ID when component mounts
//   useEffect(() => {
//     async function fetchQuestion() {
//       try {
//         const { data } = await axios.get(`/questions/${questionId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTitle(data.title);
//         setDescription(data.description);
//       } catch (error) {
//         setErrorMessage(t("home.errorFetchingQuestion"));
//       }
//     }

//     fetchQuestion();
//   }, [questionId, token, t]);

//   // Handle form submission to update the question
//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const updatedQuestion = {
//         title,
//         description,
//       };

//       // Send PUT request to update the question
//       await axios.put(`/questions/${questionId}`, updatedQuestion, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Redirect back to the home page after update
//       navigate("/home");
//     } catch (error) {
//       setErrorMessage(t("home.errorUpdatingQuestion"));
//     }
//   }

//   return (
//     <div className="container my-4">
//       <h2>{t("home.editQuestion")}</h2>
//       {errorMessage && <p className="text-danger">{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">
//             {t("home.title")}
//           </label>
//           <input
//             type="text"
//             id="title"
//             className="form-control"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">
//             {t("home.description")}
//           </label>
//           <textarea
//             id="description"
//             className="form-control"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows="4"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-success">
//           {t("home.updateQuestion")}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditQuestion;
