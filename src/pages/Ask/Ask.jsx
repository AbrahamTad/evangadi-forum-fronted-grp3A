

// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../Api/axiosConfig";
// import { useTranslation } from "react-i18next";
// import classes from "./ask.module.css";
// const Ask = () => {
//   const [successMessage, setsuccessMessage] = useState("");
//   const navigate = useNavigate();
//   const titleDom = useRef();
//   const questionDom = useRef();
//   const token = localStorage.getItem("token");
//   const { t } = useTranslation(); // Translation hook

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const titleValue = titleDom.current.value;
//     const questionValue = questionDom.current.value;

//     if (!titleValue || !questionValue) {
//       alert(t("ask.alertMissingInfo")); // Translated alert
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         "/questions/ask",
//         {
//           title: titleValue,
//           description: questionValue,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setsuccessMessage(t("ask.successMessage")); // Translated success message

//       // Redirect to home after 2 seconds
//       setTimeout(() => {
//         navigate("/home");
//       }, 2000);
//     } catch (error) {
//       alert(error.message);
//       console.log(error);
//     }
//   }

//   return (
//     <section>
//       <div className={classes["question-container"]}>
//         {/* Instructions Section */}
//         <div className={classes["instructions"]}>
//           <h2>{t("ask.instructionsTitle")}</h2>
//           <ul>
//             <li>{t("ask.step1")}</li>
//             <li>{t("ask.step2")}</li>
//             <li>{t("ask.step3")}</li>
//             <li>{t("ask.step4")}</li>
//           </ul>
//         </div>

//         {/* Post Question Section */}
//         <div className={classes["post-question"]}>
//           <h2>{t("ask.postQuestionTitle")}</h2>
//           <div className={classes.successMessage}>
//             {successMessage && (
//               <p style={{ color: "green" }}>{successMessage}</p>
//             )}
//           </div>
//           <form onSubmit={handleSubmit}>
//             <input
//               ref={titleDom}
//               type="text"
//               name="title"
//               placeholder={t("ask.placeholderTitle")} // Translated placeholder
//               className={classes["input-field"]}
//             />
//             <textarea
//               ref={questionDom}
//               name="details"
//               placeholder={t("ask.placeholderDetails")} // Translated placeholder
//               className={classes["textarea-field"]}
//             ></textarea>
//             <button type="submit" className={classes["post-btn"]}>
//               {t("ask.postButton")}
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Ask;

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/axiosConfig";
import classes from "./ask.module.css";

const Ask = () => {
  const [successMessage, setsuccessMessage] = useState("");

  const navigate = useNavigate();
  const titleDom = useRef();
  const questionDom = useRef();
  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const questionValue = questionDom.current.value;

    if (!titleValue || !questionValue) {
      alert("please provide all required informations");
      return;
    }

    try {
      const { data } = await axios.post(
        "/questions/ask",
        {
          title: titleValue,
          description: questionValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setsuccessMessage("successfully posted redirecting to home page");

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate("/home");
      }, 2000);

    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return (
    <section>
      <div className={classes["question-container"]}>
        <div className={classes["instructions"]}>
          <h2>Steps To Write A Good Question.</h2>
          <ul>
            <li>Summarize your problems in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it here.</li>
          </ul>
        </div>

        <div className={classes["post-question"]}>
          <h2>Post Your Question</h2>
          <div className={classes.successMessage}>
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleDom}
              type="text"
              name="title"
              placeholder="Question title"
              className={classes["input-field"]}
            />
            <textarea
              ref={questionDom}
              name="details"
              placeholder="Question detail ..."
              className={classes["textarea-field"]}
            ></textarea>
            <button type="submit" className={classes["post-btn"]}>
              Post Question
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Ask;
