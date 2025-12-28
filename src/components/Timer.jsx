export default function Timer({time}) {
  return <h3>Time Left: {Math.floor(time/60)}:{time%60}</h3>;
}
