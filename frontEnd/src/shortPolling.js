import axios from "axios";
import { useEffect, useState } from "react";
const url = "http://localhost:3000";

function MyPolling() {
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${url}/messages`, { message }).then(() => setmessage(""));
  };
 

  useEffect(() => {
    const count = setInterval(() => {
      axios.get(`${url}/messages/${messages.length}`).then(({ data }) => {
        setmessages((pre) => [...pre, ...data]);
        clearInterval(count);
      });
    }, 4500);
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
export default MyPolling;
