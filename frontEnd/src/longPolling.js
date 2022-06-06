import axios from "axios";
import { useEffect, useState } from "react";
const url = "http://localhost:3000";

function MyLongPolling() {
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${url}/long`, { message }).then(() => setmessage(""));
  };
  useEffect(() => {
    axios
      .get(`${url}/long`)
      .then(({ data }) => setmessages(messages.concat(data)));
  }, [messages]);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          Enter your message
          <input
            type="text"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
          />
        </label>
      </form>
      <h2>Messages</h2>
      <ul className="check-list">
        {messages.map((msg, i) => (
          <li key={i}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
}
export default MyLongPolling;
