import { useEffect, useState } from "react"

export default function MainPage() {

    const [questions, setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState([-1, -1, -1, -1, -1])
    const [isGameFinished, setIsGameFinished] = useState(false)

    function fetchQuestions() {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(({results}) => {
                let newQuestions = []
                for (const question of results) {
                    const randomIndex = Math.floor(Math.random() * 3)
                    const answers = question.incorrect_answers
                    answers.splice(randomIndex, 0, question.correct_answer)
                    const newQuestion = {
                        question: question.question,
                        answers: answers,
                        correctAnswerIndex: randomIndex
                    }
                    newQuestions.push(newQuestion)
                }

                setQuestions(newQuestions)
            })
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    const selectForAnswerId = (question, answer) => {
        setSelectedAnswers(prevAnswers => {
            prevAnswers[question] = answer
            console.log(prevAnswers)
            return prevAnswers
        })
    }

    const checkAnswers = () => {
        if (isGameFinished) {
            setIsGameFinished(false)
            setSelectedAnswers([-1, -1, -1, -1, -1])
            setQuestions([])
            fetchQuestions()
        } else {
            setIsGameFinished(true)

        }
    }

    const getCorrectCount = () => questions.filter((question, index) => selectedAnswers[index] === question.correctAnswerIndex).length
        
    

    if (questions.length <= 0)
        return <h1>Loading</h1>

    return (
        <>
            {questions.length > 0 && questions.map(({question, answers}, questionId) => (
                <div className="question" key={question.question}>
                    <h2>{question}</h2>
                    <div className="answers">
                        {answers.map((answer, answerId) => (
                            <button onClick={() => selectForAnswerId(questionId, answerId)} key={answer} className={`answer ${(selectedAnswers[questionId] === answerId) ? "selected" : ""}`}>{answer}</button>
                        ))}
                    </div>
                    <hr />
                </div>
            ))}
            {isGameFinished ? (
                <span>You answered {getCorrectCount()} questions of 5 correct</span>
            ) : ""}
            <button onClick={checkAnswers} className="check" disabled={!(selectedAnswers.every(answerId => answerId !== -1))}>{isGameFinished ? "Play again" : "Check answers"}</button>
        </>
    )
}