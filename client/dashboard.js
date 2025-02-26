// src/dashboard.js
import { collection, query, where, onSnapshot, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

export async function renderDashboard(discordSdk) {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <div class="dashboard">
      <h1>La gran competencia</h1>
      <div class="courses-container"></div>
    </div>
  `;

  const coursesSnapshot = await getDocs(collection(db, "cursos"));
  const coursesContainer = document.querySelector(".courses-container");

  coursesSnapshot.forEach((courseDoc) => {
    const courseData = courseDoc.data();

    const courseCard = document.createElement("div");
    courseCard.className = "course-card";
    courseCard.innerHTML = `
      <h3>${courseData.nombre}</h3>
      <div class="scores-list"></div>
    `;

    const scoresQuery = query(
      collection(db, "puntajes"),
      where("curso_id", "==", courseDoc.id)
    );

    onSnapshot(scoresQuery, (scoresSnapshot) => {
      const scoresList = courseCard.querySelector(".scores-list");
      scoresList.innerHTML = "";
      scoresSnapshot.forEach((scoreDoc) => {
        const scoreData = scoreDoc.data();
        const scoreElement = document.createElement("div");
        scoreElement.className = "score-item";
        scoreElement.innerHTML = `
          <span class="user">${scoreData.usuario_id}</span>
          <span class="points">${scoreData.puntos}/${courseData.puntos_maximos}</span>
        `;
        scoresList.appendChild(scoreElement);
      });
    });
    coursesContainer.appendChild(courseCard);
  });
}

export async function addScore(courseId, points, userId) {
  await addDoc(collection(db, "puntajes"), {
    usuario_id: userId,
    curso_id: courseId,
    puntos: points,
    fecha: new Date(),
  });
}
