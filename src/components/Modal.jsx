import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

/**
 * 
 * @param {boolean} show estado para abrir el modal
 * @param {any} setShow setstate para manejar el modal
 * @param {string} text texto a mostrar
 * @param {any} action funcion a ejecutar
 * @param {boolean} status estado de la promesa (pending)
 * @returns {JSX}
 */

export function ModalMessage({ show, setShow, text, action, status }) {

  if (!text || !action) {
    return null
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-black/60"
        onClose={() => {
          setShow(false);
        }}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block overflow-hidden w-full max-w-[80%] sm:max-w-xs p-6 text-center bg-white align-middle shadow-xl rounded-2xl">
              <span className="font-medium">{text}</span>
              <div className="grid grid-cols-2 items-center gap-4 mt-5 w-fit mx-auto">
                <button
                  disabled={status}
                  className={
                    "py-1.5 px-3 danger rounded-md" +
                    (status ? " animate-pulse" : "")
                  }
                  onClick={() => action()}
                  type="button"
                >
                  {status ? "Borrando..." : "Borrar"}
                </button>
                <button
                  className="py-1.5 px-3 bg-green-200 text-green-900 rounded-md"
                  onClick={() => {
                    setShow(false);
                  }}
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export function Modal({show, setShow, children}) {

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          setShow(false);
        }}
      >
        <div className="min-h-screen py-10 flex justify-center items-center bg-black/60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
          <div className="inline-block overflow-hidden w-full max-w-[90%] sm:max-w-md py-10 -mb-10">
          {children}
          </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}