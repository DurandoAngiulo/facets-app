import React from "react";
import { PrimaryButton, SecondaryButton } from "@/components/Button/Index";

const Modal = ({ isOpen, isClosed, onRefresh }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-lg mx-auto my-6">
            {/*content*/}
            <div className="py-5 px-3 relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <h3 className="text-body text-center">Ready to refresh?</h3>

              {/*body*/}
              <div className="relative pb-5 text-center flex-auto">
                <p className="mt-3 text-body">
                  Ready to move on from the current options? Once you do, there&apos;s no going back unless you&apos;ve
                  messaged them.
                </p>
                <p className="text-body">Dig deeper or say goodbye!</p>
              </div>
              {/*footer*/}
              <div className="flex flex-col gap-2 items-center justify-end">
                <button onClick={isClosed}>
                  <SecondaryButton active="true" label="Go back" small />
                </button>
                <button onClick={onRefresh}>
                  <PrimaryButton active="true" label="Refresh" small />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && <div className="opacity-25 fixed inset-0 z-20 bg-black" onClick={isClosed}></div>}
    </>
  );
};

export default Modal;
