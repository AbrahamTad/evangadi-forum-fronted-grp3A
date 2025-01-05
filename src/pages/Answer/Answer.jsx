
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../Api/axiosConfig";
import { AppState } from "../../App";
import { useTranslation } from "react-i18next"; // Import translation hook
import classes from "./answer.module.css";

const Answer = () => {
  const navigate = useNavigate();
  const { questionid } = useParams();
  const [question, setquestion] = useState(null);
  const [answers, setanswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const token = localStorage.getItem("token");
  const { user } = useContext(AppState);
  const { t } = useTranslation(); // Translation hook

  async function fetchQuestion() {
    try {
      const { data } = await axios.get(`/questions/${questionid}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const singleQuestion = data?.question;
      setquestion(singleQuestion);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function fetchAnswers() {
    try {
      const { data } = await axios.get(`/answer/${questionid}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const allAnswers = data?.answers;
      setanswers(allAnswers);
    } catch (error) {
      console.error("Error:", error?.response?.data?.msg);
    }
  }

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [questionid]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!newAnswer) {
      alert(t("answer.alertMissingAnswer")); // Translated alert
      return;
    }

    setanswers([
      {
        answer: newAnswer,
        created_at: new Date().toISOString(),
        username: user.username,
      },
      ...answers,
    ]);

    try {
      const { data } = await axios.post(
        "/answer",
        { questionid: questionid, answer: newAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setsuccessMessage(t("answer.successMessage")); // Translated success message
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      alert(error);
      console.log(error);
      setanswers(answers); // Rollback if API fails
    }

    setNewAnswer("");
  }

  return (
    <section>
      <div className={classes["answer-page"]}>
        <div className={classes["question-container"]}>
          <h2>{t("answer.questionTitle")}</h2>
          {question ? (
            <div className={classes["question"]}>
              <div className={classes["question-title"]}>
                <span className={classes["question-icon"]}>🔵</span>
                <strong>{question.title}</strong>
              </div>
              <div className={classes["question-description"]}>
                {question.description}
              </div>
            </div>
          ) : (
            <p>{t("answer.loadingQuestion")}</p>
          )}
        </div>

        <div className={classes["community-answers"]}>
          <h3>{t("answer.communityAnswers")}</h3>
          {answers.length > 0 ? (
            <div>
              {answers?.map((e, i) => (
                <div key={i} className={classes["answer-item"]}>
                  <div className={classes.user}>
                    <div className={classes["avatar"]}>👤</div>
                    <span className={classes["username"]}>{e.username}</span>
                  </div>
                  <div className={classes["answer-content"]}>
                    <p>{e.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>{t("answer.noAnswers")}</p>
          )}
        </div>

        <div className={classes["post-answer"]}>
          <div className={classes.successMessage}>
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder={t("answer.placeholderAnswer")} // Translated placeholder
              className={classes["answer-input"]}
            ></textarea>
            <button type="submit" className={classes["post-answer-btn"]}>
              {t("answer.postButton")} {/* Translated button text */}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Answer;



// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from '../../Api/axiosConfig';
// import { AppState } from '../../App';
// import classes from "./answer.module.css";

// const Answer = () => {

//     const navigate = useNavigate()
//     const {questionid} = useParams()

//     const [question, setquestion] = useState(null);

//     const [answers, setanswers] = useState([]);
//     const [newAnswer, setNewAnswer] = useState("");
//     const [successMessage, setsuccessMessage] = useState("");

//     const token = localStorage.getItem("token");
//     const { user } = useContext(AppState);
//     // const answerDom = useRef();
    
//     async function fetchQuestion() {
//       try {
//         const { data } = await axios.get(`/questions/${questionid}`, {
//           headers: { Authorization: "Bearer " + token },
//         });
//         // console.log(data);

//         const singleQuestion = data?.question;

//         setquestion(singleQuestion);
//       } catch (error) {
//         console.error("Error:", error.message);
//       }
//     }
    

//     async function fetchAnswers() {
//       try {
//         const { data } = await axios.get(`/answer/${questionid}`, {
//           headers: { Authorization: "Bearer " + token },
//         });
//         // console.log(data);

//         const allAnswers = data?.answers;
//         setanswers(allAnswers);
//       } catch (error) {
//         console.error("Error:", error?.response?.data?.msg);
//       }
//     }
//     // console.log(answers);

//     useEffect(() => {
//       fetchQuestion();
//       fetchAnswers();
//     }, [questionid]);



//     async function handleSubmit(e) {
//       e.preventDefault();
//       //   const answerValue = answerDom.current.value;

//       if (!newAnswer) {
//         alert("please provide answer first");
//         return;
//       }

      
//       setanswers([
//         {
//           answer: newAnswer,
//           created_at: new Date().toISOString(),
//           username: user.username,
//         },
//         ...answers,
//       ]);

//       try {
//         const { data } = await axios.post(
//           "/answer",
//           { questionid: questionid, answer: newAnswer },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
        
//         setsuccessMessage("successfully posted redirecting to home page");

//         setTimeout(() => {
//           navigate("/home");
//         }, 2000);
//         // alert("Answer posted successfull");
//         // console.log(data);
//       } catch (error) {
//         alert(error);
//         console.log(error);
//         // Rollback if the API call fails
//         setanswers(answers);
//       }
//       // Clear the input
//       setNewAnswer("");
//     }

//   return (
//     <section>
//       <div className={classes["answer-page"]}>
//         <div className={classes["question-container"]}>
//           <h2>QUESTION</h2>
//           {question ? (
//             <div className={classes["question"]}>
//               <div className={classes["question-title"]}>
//                 <span className={classes["question-icon"]}>🔵</span>
//                 <strong>{question.title}</strong>
//               </div>
//               <div className={classes["question-description"]}>
//                 {question.description}
//               </div>
//             </div>
//           ) : (
//             <p>Loading question...</p>
//           )}
//         </div>

//         <div className={classes["community-answers"]}>
//           <h3>Answer From The Community</h3>
//           {answers.length > 0 ? (
//             <div>
//               {answers?.map((e, i) => (
//                 <div key={i} className={classes["answer-item"]}>
//                   <div className={classes.user}>
//                     <div className={classes["avatar"]}>👤</div>
//                     <span className={classes["username"]}>{e.username}</span>
//                   </div>

//                   <div className={classes["answer-content"]}>
//                     <p>{e.answer}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No answers yet.</p>
//           )}
//         </div>

//         <div className={classes["post-answer"]}>
//           <div className={classes.successMessage}>
//             {successMessage && (
//               <p style={{ color: "green" }}>{successMessage}</p>
//             )}
//           </div>
//           <form onSubmit={handleSubmit}>
//             <textarea
//               value={newAnswer}
//               onChange={(e) => setNewAnswer(e.target.value)}
//               placeholder="Your answer ..."
//               className={classes["answer-input"]}
//             ></textarea>
//             <button type="submit" className={classes["post-answer-btn"]}>
//               Post Answer
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Answer