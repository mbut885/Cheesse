import "./Timer.css";

export default function Timer() {
  return (
    <div className="timerWrapper">
        <div>
            <h3 className="whiteTimer">00:00</h3>
        </div>
        <div>
            <h3 className="blackTimer">00:00</h3>
        </div>
    </div>
  );
}