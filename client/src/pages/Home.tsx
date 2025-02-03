// import Modal from "../components/Modal";
// import { useState } from "react";
import JoinButton from "../components/JoinButton";
import CreateButton from "../components/CreateButton";

function Home() {
  // const [modalState, setModalState] = useState({ open: false, type: "" });

  // const handleOpen = (type: string) => {
  //   setModalState({ open: true, type });
  // };

  // const handleClose = () => {
  //   setModalState({ open: false, type: "" });
  // };

  return (
    <>
      <div>
        <div className="flex flex-col h-screen justify-center items-center gap-10">
          {/* should route to generated room */}
          <CreateButton />
          <JoinButton />
          {/* <Modal
            isOpen={modalState.open}
            onClose={handleClose}
            type={modalState.type}
          >
            {modalState.type === "join" && (
              // Don't need to to use form here
              <form action="">
                <div className="flex flex-col mb-5 gap-2">
                  <h1>
                    <b>Join Room</b>
                  </h1>
                  <input
                    type="text"
                    placeholder="Enter Room ID"
                    className="border border-gray-400 rounded-sm p-1 hover:border-gray-500"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button className="bg-gray-400 hover:bg-gray-500 shadow-sm rounded-sm p-1 w-20">
                    Join
                  </button>
                </div>
              </form>
            )}
          </Modal> */}
        </div>
        {/* temp uuid */}
        <span className="text-xs">UUID: {"0"}</span>
      </div>
    </>
  );
}

export default Home;
