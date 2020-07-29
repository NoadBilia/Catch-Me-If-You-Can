var users = [ // מערך של יוזרים שיש במערכת
  { username: "Noad",score: 1000,date: "20.07.2020"},
  { username: "Orel",score: 900,date: "17.07.2020"},
  { username: "Meir",score: 150,date: "13.07.2020"},
  { username: "Rivka",score: 100,date: "10.07.2020"},
  { username: "Tal",score: 50,date: "01.07.2020"}
];

var h1 = document.querySelector("h1"); // תופס את תגית איץ1 
var spinners = document.querySelector("#spinner"); // תופס את תגית ספינר
var points = document.querySelector("#points"); // תופס את תגית נקודות
var background = document.querySelector("#background"); // תופס את תגית איץ1 
var miss = document.querySelector("#points4"); // תופס את תגית כמה לחיצות לא במקום הנכון
var levelLVL = document.querySelector("#points3"); // תופס את תגית שלב
var Nlevel = document.querySelector("#points2"); // תופס את תגית כמה נשאר כדי להגיע לשלב הבא
var score1 = 0; // ניקוד שלך מתחיל באפס
var timer = 60; // טיימר
var clicks = 0; // סופר כמה לחיצות לא במקום הנכון
var level = 1; // שלב
var i = 0; // סופר כדי לעלות שלב ולראות עוד כמה לחיצות נשאר לי כדי לעבור לשלב הבא
var n = 300; // כמות זמן שהוא בורח
var num = 2; // מהירות סיבוב הדייב

h1.addEventListener("click", startGame); // אם אתה לוחץ על איץ1 תשלח לפונקציה התחלת משחק
background.addEventListener("click", addMiss); // אם לוחצים על הדיב שולח אותי לפונקציה הוספת ניקוד

function startGame() { // פונקצית תחילת משחק
  alert("You want to start the game ?");
  h1.textContent = 'STOP GAME' // שינוי של הכותרת לסטוף
  spinner.style.animationDuration = num + "s"; // באיזה מהירות הסתובב הדייב
  spinners.addEventListener("mouseover", escape); // אם אתה עובר על הדיב תשלח לפונקצית בריחה
  background.addEventListener("click", reducePoint);
  spinner.addEventListener("click", addPoint); // אם לוחצים על הדיב שולח אותי לפונקציה הוספת ניקוד
}

function escape() { // פונקצית בריחה של הדיב
  setTimeout(function () {
    spinners.style.top = Math.floor(Math.random() * 630 + 10) + "px"; // מוקומות רנדומלי שהוא קופץ אליהם
    spinners.style.left = Math.floor(Math.random() * 1230 + 10) + "px"; // מוקומות רנדומלי שהוא קופץ אליהם
  }, n); // כל ריחוף מעל הדיב זה יברח אחרי 300 מילי שניות 
}

function reducePoint() { // פונקציה להורדת נקודות אם לחצתי על הרקע
  score1 = score1 - (level * 1); // תוריד 1 נקודות כפול השלב
  points.innerHTML = score1; // מכניס את הערך שיש בציון לנקודות
}

function addPoint(e) { // פונקציה להוספה נקודות אם הצלחתי ללחוץ על הדיב
  e.stopPropagation(); // הפעלה שרק הפונקציה של ההוספת ניקוד לדייב ובלי ההורדה 
  score1 = score1 + (level * 10); // תוסיף 10 נקודות כפול השלב
  points.innerHTML = score1; // מכניס את הערך שיש בציון לנקודות
  i++;
  if (i == 10) {
    levelup(); // קריאה לפונקצית הוספת שלב
  }
  if (level != 5 && i != 20) { // 
    NextLevel();
  }
}

function addMiss() { // פונקציה לספירה כמה לחיצות לא במקום הנכון
  clicks = clicks + 1; 
  miss.innerHTML = clicks;
}

function levelup() { // פונקציה לעלות שלב
  if (level == 5 && i == 10) { // רק במקרה שהשלב שלו 5 וגם יש 10 לחיצות נכונות תכנס
    alert("COngratrs, you win \n your score is: " + score1); // הודעה ניצחת
    gameOver(); // קורא לפנקציה כדי לבדוק אם הניקוד שלו גבוהה יותר מאחד האלופים
    background.removeEventListener("click", addMiss); // אם לוחצים על הדיב שולח אותי לפונקציה הוספת ניקוד
    spinners.style.top = Math.floor(Math.random() * 0) + "px"; // מוקומות רנדומלי שהוא קופץ אליהם
    spinners.style.left = Math.floor(Math.random() * 0) + "px"; // מוקומות רנדומלי שהוא קופץ אליהם
    i = 20; // סתם מספר כדי שלא יכנס להוספת שלב
  } else if (i == 10) { // אם איי שווה ל10 זה אומר שאתה צריך לעלות שלב ולכן תכנס
    level++; // תגדיל את שלב ב1
    levelLVL.innerHTML = level; // מכניס את הערך שיש שלב לשלב 
    num = num - 0.25; // תפחית את 
    sec = sec + 10; // תוסיף עוד 10 שניות בטיימר
    n = (n - 50); // תוריד מהזמן שהוא נשאר שעוברים עליו עם העכבר
    i = 0; // הספירה של הפעמיים שהוא לחץ נכון שווה ל0
  }
}

function NextLevel() { // פונקציה שרושמת כמה לחיצות נשאר לי כדי להגיע לשלב הבא
  var j = (10 - i); // ג'יי שווה ל10 פחות איי
  Nlevel.innerHTML = j; // מכניס את הערך שיש ג'יי לכמה נשאר לי כדי להגיע לשלב הבא
}

var leaderBoard = document.getElementById("TopPlayer"); // לתפוס את המקום של הטופ שחקנים
var leadJSON = localStorage.getItem("users"); // לקבל מהאיחסון את המערך אובייקטים שהוא עכשיו סטרינג
if (leadJSON != null) { // תכנס אם האיחסון לא ריק
  users = JSON.parse(leadJSON); // משנה את המערך מסטרינג לאובייקט
}
leaderBoard.innerHTML = createleaderBoard(); // קריאה של הפונקציה ליצירת אלופים בדף ותכניס את זה לתגית של האלופים

function createleaderBoard() { // ליצור רשימה של אלופים 
  var toAppend = ""; // ליצור סיטרינג ריק
  users.forEach(function (x) { // מערך יוזר.לעבור על המערך
    toAppend += `<h4>${x.username} -|- ${x.score} -|- ${x.date}</h4>`;
  }); // הוספת נתונים
  return toAppend; // תשלח חזרה את הסטרינג
}

class User { //  c-tor יצירת 
  constructor(_name, _score, _date) { // מגיעים 3 נתונים
    this.username = _name;
    this.score = _score;
    this.date = _date;
  }
}

function stopGame() { // פונקציה לעצירת המשחק
  h1.textContent = 'START GAME' // שינוי של הכותרת להתחיל את המשחק
  score1 = 0;
  points.innerHTML = score1;
  clicks = 0;
  miss.innerHTML = clicks;
  level = 1;
  levelLVL.innerHTML = level;
  sec = 60; // שווה ל60 שניות
  secDOM.innerHTML = sec;
  j = 0;
  Nlevel.innerHTML = j;
  i = 0; // סופר כדי לעלות שלב ולראות עוד כמה לחיצות נשאר לי כדי לעבור לשלב הבא
  n = 300; // כמות זמן שהוא בורח
  spinner.style.animationDuration = "0s"; // 
  spinners.style.top = Math.floor(Math.random() * 0) + "px"; // לחזיר את הגייב למקום 0
  spinners.style.left = Math.floor(Math.random() * 0) + "px"; // לחזיר את הגייב למקום 0
  spinners.removeEventListener("mouseover", escape); // תפסיק לתפוס
  background.removeEventListener("click", reducePoint); // תפסיק לתפוס
  spinner.removeEventListener("click", addPoint); // תפסיק לתפוס
  background.removeEventListener("click", addMiss); // תפסיק לתפוס
};