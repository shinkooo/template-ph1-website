'use strict';

// 難問目か、問題のタイトル、選択肢、補足っぽいやつをひとまとめにしたリストがほしい
const QUESTIONS=[
  {
    index: 0,
    title: "日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？",
    choices: ["約28万人", "約79万人", "約183万人"],
    note: "経済産業省 2019年3月 － IT 人材需給に関する調査",
  },
  {
    index: 1,
    title: "既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？",
    choices: ["INTECH", "BIZZTECH", "X-TECH"],
    note: "",
  },
  {
    index: 2,
    title: "IoTとは何の略でしょう？",
    choices: ["INTInternet of Things", " Integrate into Technology ", "Information on Tool"],
    note: "",
  },
  {
    index: 3,
    title: "日本が目指すサイバー空間とフィジカル空間を高度に融合させたシステムによって開かれる未来社会のことをなんと言うでしょうか？",
    choices: ["Society 5.0", "CyPhy", "X-SDGs"],
    note: "Society5.0 - 科学技術政策 - 内閣府",
  },
  {
    index: 4,
    title: "イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？",
    choices: ["Web3.0", "NFT", "X-メタバース"],
    note: "",
  },
  {
    index: 5,
    title: "先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？",
    choices: ["約2倍", "約5倍", "X-約11倍"],
    note: "Accenture Technology Vision 2021",
  },
]

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

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledQuestions=shuffle(QUESTIONS);

function addQuestions(){
  const main= document.getElementById("js-quiz-in");

  let content = "";

  shuffledQuestions.forEach((question, questionNumber) => {


    let choices = "";

    question.choices.forEach((choice, index) =>{
      choices += 
      `
      <li class="p-quiz-box__answer__item">
        <button class="p-quiz-box__answer__button js-answer" data-answer="${index}">
          ${choice}<img src="../assets/img/icon/icon-arrow.svg" alt="">
        </button>
      </li>
      `
    })


    content += 
    `
      <section class="p-quiz-box js-quiz" data-quiz="${question.index}">
      <div class="p-quiz-box__question">
        <h2 class="p-quiz-box__question__title">
          <span class="p-quiz-box__label">Q${questionNumber+1}</span>
          <span class="p-quiz-box__question__title__text">${question.title}</span>
        </h2>
        <figure class="p-quiz-box__questioｃn__image">
          <img src="../assets/img/quiz/img-quiz0${question.index+1}.png" alt="aaa">
        </figure>
      </div>
      <div class="p-quiz-box__answer">
        <span class="p-quiz-box__label p-quiz-box__label--accent">A</span>
        <ul class="p-quiz-box__answer__list">
    `
      + choices +
    `
        </ul>
        <div class="p-quiz-box__answer__correct js-answerBox">
          <p class="p-quiz-box__answer__correct__title js-answerTitle"></p>
          <p class="p-quiz-box__answer__correct__content">
            <span class="p-quiz-box__answer__correct__content__label">A</span>
            <span class="js-answerText"></span>
          </p>
        </div>
      </div>
    `;

    if (question.note!="") {
      content += 
      `
        <cite class="p-quiz-box__note">
          <img src="../assets/img/icon/icon-arrow.svg" alt="" class="">${question.note}
        </cite>
      `
    };

    content += ` </section>`;
  })

  main.insertAdjacentHTML("beforeend", content);
}

addQuestions();

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