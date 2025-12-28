export default function QuestionCard({q,answer,setAnswer}) {
  return (
    <div>
      <p>{q.question}</p>
      {["A","B","C","D"].map(o=>(
        <label key={o}>
          <input
            type="radio"
            checked={answer===o}
            onChange={()=>setAnswer(o)}
          />
          {q[`option_${o.toLowerCase()}`]}
        </label>
      ))}
    </div>
  );
}
