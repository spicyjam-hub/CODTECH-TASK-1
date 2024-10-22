const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Rome", correct: false },
            { text: "Berlin", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false }
        ]
    },
    {
        question: "What is the national animal of India?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Lion", correct: false },
            { text: "Tiger", correct: true },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which of the dish is italian?",
        answers: [
            { text: "Butter Chicken", correct: false }, 
            { text: "Noodles", correct: false },
            { text: "Pizza", correct: true },
            { text: "Dumplings", correct: false }
        ]
    },
    {
        question: "What is the full form of HTML?",
        answers: [
            { text: "hyper text makeup language", correct: false }, 
            { text: "Hypertext Markup Language", correct: true },
            { text: "history of makeup language", correct: false },
            { text: "hyper text markup notes", correct: false }
        ]   
    },
    {
        question: "What is the largest mamal on Earth?",
        answers: [
            { text: "Peacock", correct: false }, 
            { text: "Bat", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Tiger", correct: false }
        ]   
    },
    {
        question: "Who wrote Romeo and Juliet?",
        answers: [
            { text: "Bill mores", correct: false }, 
            { text: "Mark Twain", correct: false },
            { text: "Shakespeare", correct: true },
            { text: "Ronald Reagan", correct: false }
        ]   
    }
];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const questionElement = document.getElementById('question');
const answerListElement = document.getElementById('answer-list');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
    submitButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    answerListElement.innerHTML = '';  // Clear the previous options
    selectedAnswer = null;  // Reset the selected answer

    question.answers.forEach(answer => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'answer';
        checkbox.classList.add('answer-checkbox');

        const label = document.createElement('label');
        label.textContent = answer.text;

        li.appendChild(checkbox);
        li.appendChild(label);

        // Add a click event to select the answer and highlight it
        li.addEventListener('click', () => selectAnswer(li, answer, checkbox));

        answerListElement.appendChild(li);
    });
}

function selectAnswer(listItem, answer, checkbox) {
    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('.answer-checkbox');
    checkboxes.forEach(box => box.checked = false); // Uncheck all checkboxes

    // Remove the selected class from all list items
    const listItems = answerListElement.querySelectorAll('li');
    listItems.forEach(item => item.classList.remove('selected'));

    // Check the clicked checkbox and mark the list item as selected
    checkbox.checked = true;
    listItem.classList.add('selected'); // Highlight the selected option
    selectedAnswer = answer; // Store the selected answer
}

nextButton.addEventListener('click', () => {
    if (selectedAnswer) {
        // Check if the selected answer is correct
        if (selectedAnswer.correct) {
            score++;
        }
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showResult();
        }
    } else {
        alert("Please select an answer before proceeding!");
    }
});

function showResult() {
    questionElement.classList.add('hidden');
    answerListElement.classList.add('hidden');
    nextButton.classList.add('hidden');
    submitButton.classList.add('hidden');
    resultElement.classList.remove('hidden');
    scoreElement.textContent = `${score} / ${questions.length}`;
}

submitButton.addEventListener('click', () => {
    showResult();
});

startQuiz();
