import React, { useState, useEffect } from "react";
import "./styles.css";
const subscribeMsg = {
  event: "bts:subscribe",
  data: {
    channel: "order_book_btcusd"
  }
};

export default function App() {
  const [socket, setSocket] = useState("");
  const [runsocket, setRunSocket] = useState("");

  useEffect(() => {
    if (typeof runsocket === "boolean") {
      runsocket ? runSocket() : disableSocket();
    }
  }, [runsocket]);

  const runSocket = _ => {
    console.log("runSocket");
    const sw = new WebSocket("wss://ws.bitstamp.net");
    setSocket(sw);

    sw.onopen = function() {
      sw.send(JSON.stringify(subscribeMsg));
    };

    sw.onmessage = msg => {
      let msgdata = JSON.parse(msg.data);
      console.log("onmessage", msgdata);
    };
  };

  const disableSocket = _ => {
    socket.close();
    console.log("disableSocket");
  };

  return (
    <div className="App">
      <button onClick={() => setRunSocket(!runsocket)}>
        {runsocket ? "Stop socket" : "Start socket"}
      </button>
    </div>
  );
}
