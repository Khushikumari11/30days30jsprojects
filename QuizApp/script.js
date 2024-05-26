const questions = [
    {
        question: "Who is the founder of Apple?",
        answers: [
            {text: "Jackson Henry", correct: false},
            {text: "Steve Job", correct: true},
            {text: "Henry Smith", correct: false},
            {text: "Simpson", correct: false},
        ]
    },
    {
        question: "What does IBM stand for?",
        answers: [
            {text: "International Business Model", correct: false},
            {text: "Industry Business Model", correct: false},
            {text: "International Business Machines", correct: true},
            {text: "Integrated Business Model", correct: false},
        ]
    },
    {
        question: "Windows is a product of",
        answers: [
            {text: "Google LLC ", correct: false},
            {text: "Microsoft Corporation", correct: true},
            {text: "Oracle Corporation", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which city is called the Silicon City of India?",
        answers: [
            {text: "Hyderabad", correct: false},
            {text: "Delhi", correct: false},
            {text: "Chennai", correct: false},
            {text: "Bangalore", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =  selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scores ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();

