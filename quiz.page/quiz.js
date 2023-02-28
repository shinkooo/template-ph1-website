'use strict';

// 回答一覧
const CORRECT_ANSWERS = [
  {
    index: 1,
    value: '約79万人'
  },
  {
    index: 2,
    value: 'X-TECH'
  },
  {
    index: 0,
    value: 'Internet of Things'
  },
  {
    index: 0,
    value: 'Society 5.0'
  },
  {
    index: 0,
    value: 'Web3.0'
  },
  {
    index: 1,
    value: '約5倍'
  }
];

// 問題ごと
const allQuiz = document.querySelectorAll(".js-quiz");
allQuiz.forEach(quiz => {
  const choices = quiz.querySelectorAll(".js-answer");
  const answerBox = quiz.querySelector(".js-answerBox");
  const answerTitle = quiz.querySelector(".js-answerTitle");
  const answerText = quiz.querySelector(".js-answerText");

  const selectedQuiz = quiz.getAttribute("data-quiz");
  
  // 選択肢ごと
  choices.forEach(choice =>{
    choice.addEventListener('click', () => {
      const selectedAnswer = choice.getAttribute("data-answer")
      answerText.innerHTML = CORRECT_ANSWERS[selectedQuiz].value;
      choice.classList.add("is-selected");
      // 正誤判定
      if (selectedAnswer == CORRECT_ANSWERS[selectedQuiz].index) {
        answerBox.classList.add("is-correct");
        answerTitle.innerHTML = "正解！";
      } else {
        answerBox.classList.add("is-incorrect");
        answerTitle.innerHTML = "不正解..."
      }

      // 3つの選択肢を押せなくする
      choices.forEach(choice => {
        choice.disabled=true;
      })
    })
    
  })
})