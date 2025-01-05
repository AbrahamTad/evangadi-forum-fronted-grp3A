
import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Api/axiosConfig";
import classes from "./home.module.css";
import { MdKeyboardArrowRight, MdEdit, MdDelete } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation(); // Translation hook for multilingual support
  const { user } = useContext(AppState); // Get the current logged-in user from context
  const [questions, setQuestions] = useState([]); // State to store all questions
  const [sortedQuestions, setSortedQuestions] = useState([]); // State to store sorted questions
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // State to track which question is being deleted
  const token = localStorage.getItem("token"); // Get token from localStorage for authorization
  const navigate = useNavigate(); // Hook for navigation
  const [searchQuery, setSearchQuery] = useState(""); // State for search query input (for title and username)
  const [sortOption, setSortOption] = useState("Most Recent"); // Default sorting option

  // Function to fetch all questions from the API
  async function fetchData() {
    try {
      const { data } = await axios.get("/questions/all-questions", {
        headers: { Authorization: "Bearer " + token }, // Authorization header
      });
      setQuestions(data?.questions); // Set the fetched questions
      setSortedQuestions(data?.questions); // Initially set the sorted questions to the fetched ones
    } catch (error) {
      console.error("Error:", error.message); // Log any errors
    }
  }

  // Effect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Effect hook to apply sorting whenever questions or sort option changes
  useEffect(() => {
    let sortedData = [...questions]; // Create a copy of the questions array

    // Apply sorting based on the selected option
    if (sortOption === "Most Recent") {
      sortedData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at) // Sort by most recent
      );
    } else if (sortOption === "Most Popular") {
      sortedData.sort((a, b) => b.views - a.views); // Sort by most popular (views)
    } else if (sortOption === "By Questions") {
      sortedData.sort((a, b) => a.title.localeCompare(b.title)); // Sort by question title (alphabetically)
    } else if (sortOption === "By Date") {
      sortedData.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at) // Sort by date
      );
    }

    setSortedQuestions(sortedData); // Update the sorted questions list
  }, [questions, sortOption]);

  // Handle the search query input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query with user input
  };

  // Function to trigger when a user attempts to delete a question
  const handleDelete = (questionId) => {
    setConfirmDeleteId(questionId); // Set the question ID to confirm deletion
  };

  // Function to confirm the deletion of a question
  const handleConfirmDelete = async () => {
    try {
      // Delete the question via API call
      await axios.delete(`/questions/delete-question/${confirmDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Authorization header
      });
      setQuestions(
        (prev) => prev.filter((q) => q.questionid !== confirmDeleteId) // Remove deleted question from state
      );
      setSuccessMessage(t("home.deleteSuccess")); // Show success message
      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
    } catch (error) {
      setErrorMessage(t("home.deleteError")); // Show error message if deletion fails
      setTimeout(() => setErrorMessage(""), 3000); // Clear error message after 3 seconds
    } finally {
      setConfirmDeleteId(null); // Clear the confirmation ID after the action
    }
  };

  // Function to cancel the deletion action
  const handleCancelDelete = () => {
    setConfirmDeleteId(null); // Reset the delete confirmation ID
  };

  // Filter questions based on the search query (both title and username)
  const filteredQuestions = sortedQuestions.filter((question) => {
    const searchText = searchQuery.toLowerCase(); // Convert search query to lowercase
    const titleMatch = question.title.toLowerCase().includes(searchText); // Check if title matches the search query
    const usernameMatch = question.username.toLowerCase().includes(searchText); // Check if username matches the search query
    return titleMatch || usernameMatch; // Return true if either title or username matches the query
  });

  // Handle the change in the sorting option
  const handleSortChange = (e) => {
    setSortOption(e.target.value); // Set the selected sort option
  };

  return (
    <section>
      <div className={classes["main-container"]}>
        <div className={classes["welcome-section"]}>
          <Link to={"/ask"} className={classes["ask-question-btn"]}>
            {t("home.askQuestion")} {/* Ask question button */}
          </Link>
          <div className={classes["welcome-message"]}>
            {t("home.welcome")} :{" "}
            <span className={classes["username"]}> {user?.username}</span>
          </div>
        </div>

        {/* Combined Search Bar for both Question Title and Username */}
        <div className={classes["search-bar"]}>
          <input
            value={searchQuery} // Controlled input for search query
            onChange={handleSearch} // Update the search query state on input change
            type="text"
            className={classes["search-input"]}
            placeholder={t("home.searchPlaceholder")} // Placeholder text from translation
          />
        </div>

        {/* Sort Dropdown */}
        <div className={classes["sort-dropdown"]}>
          <select
            value={sortOption} // Controlled value for sorting
            onChange={handleSortChange} // Update sorting option when changed
            className={classes["sort-select"]}
          >
            <option value="Most Recent">{t("home.mostRecent")}</option>
            <option value="Most Popular">{t("home.mostPopular")}</option>
            <option value="By Questions">{t("home.byQuestions")}</option>
            <option value="By Date">{t("home.byDate")}</option>
          </select>
        </div>

        {/* Success and Error Messages */}
        {successMessage && (
          <div className={classes["success-message"]}>{successMessage}</div>
        )}
        {errorMessage && (
          <div className={classes["error-message"]}>{errorMessage}</div>
        )}

        {/* Delete Confirmation Prompt */}
        {confirmDeleteId && (
          <div className={classes["confirmation-prompt"]}>
            <p>{t("home.confirmDelete")}</p>
            <button onClick={handleConfirmDelete} className="btn btn-danger">
              {t("home.yesDelete")}
            </button>
            <button onClick={handleCancelDelete} className="btn btn-secondary">
              {t("home.cancel")}
            </button>
          </div>
        )}

        {/* Display Questions */}
        {questions.length > 0 ? (
          <div>
            {filteredQuestions.map((e) => (
              <div className={classes["questions-list"]} key={e.questionid}>
                <div className={classes["question-item"]}>
                  <Link
                    to={`/question/${e.questionid}`}
                    className={classes["question-link"]}
                  >
                    <div className={classes["user-info"]}>
                      <div className={classes["user"]}>
                        <div className={classes["user-avatar"]}>
                          <IoIosContact size={"80"} />
                        </div>
                        <p>{e.username}</p>
                      </div>
                      <div className={classes["question-text"]}>{e.title}</div>
                    </div>
                  </Link>
                  <div className={classes["info-and-actions"]}>
                    <span className={classes["timestamp"]}>
                      {new Date(e.created_at).toLocaleString()}{" "}
                      {/* Format creation date */}
                    </span>
                    {/* Show action icons for the question owner */}
                    {user?.username === e.username && (
                      <div className={classes["action-icons"]}>
                        <MdEdit
                          size={"24"}
                          color="blue"
                          onClick={() =>
                            navigate(`/edit-question/${e.questionid}`)
                          }
                          className={classes["icon"]}
                          title={t("home.edit")}
                        />
                        <MdDelete
                          size={"24"}
                          color="red"
                          onClick={() => handleDelete(e.questionid)}
                          className={classes["icon"]}
                          title={t("home.delete")}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>{t("home.noQuestions")}</p> // Display message if no questions are available
        )}
      </div>
    </section>
  );
};

export default Home;




