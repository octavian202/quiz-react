export default function StartPage({ startQuiz }) {
    return (
    <>
        <h1>Quizzical</h1>
        <p>Some description</p>
        <button className="start-quiz" onClick={startQuiz}>Start Quiz</button>
    </>
    )
}