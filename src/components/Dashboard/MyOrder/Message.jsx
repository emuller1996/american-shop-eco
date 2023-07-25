import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MessageComponent = ({ id }) => {
  const [messages, setMessages] = useState(undefined);
  const [messageInput, setMessageInput] = useState("");
  const { user } = useAuth0();
  useEffect(() => {
    console.log(id);
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    try {
      const result = await axios.get(`/messages/${id}`);
      console.log(result);
      setMessages(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateMessage = async (e) => {
    e.preventDefault();
    try {
      console.log(messageInput);
      const result = await axios.post(`/messages/${id}`, {
        message: messageInput,
        written: user.name,
        OrderId: id,
      });
      console.log(result);
      getAllMessages();
      setMessageInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-12">
      <div className="card border-0 rounded-0">
        <div className="card-body">
          <h4 className="card-title">Mensajes</h4>
          <ul className="list-group mb-3 border border-secondary  ">
            {messages && messages.length === 0 && (
              <li className="list-group-item ">
                <p className="text-muted text-center m-0">Sin Mensaje</p>
              </li>
            )}

            {messages &&
              messages.map((m) => (
                <li key={m.createdAt} className="list-group-item">
                  <div className="row justify-content-center align-items-center g-2">
                    <div className="col-4 col-md-4 text-end">
                      <small className="text-muted">{m.written}</small>
                      <small
                        className=" text-muted  d-block"
                        style={{ fontSize: "0.7em" }}
                      >
                        {`${m.createdAt.substring(
                          0,
                          10
                        )}  ${m.createdAt.substring(12, 16)} `}
                      </small>
                    </div>
                    <div className="col-8 col-md-6 fw-semibold">
                      {m.message}
                    </div>
                  </div>
                  <span></span>
                </li>
              ))}
          </ul>
          <div className="mb-3">
            <form onSubmit={onCreateMessage}>
              <div className="row justify-content-center align-items-center g-2">
                <div className="col-8">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="form-control"
                    name=""
                    id="s"
                    rows="3"
                  ></textarea>
                </div>
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-success text-white w-100 "
                    style={{ height: "100%" }}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageComponent;
