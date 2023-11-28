import { ChevronIcon } from '@/components/Icons'
import { Disclosure, Transition } from '@headlessui/react'


export const MyDisclosure = ({title, text}) => {
  return (
    <div className="px-8 w-full  bg-white p-2">
        <Disclosure >
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#BCF0C4] px-4 py-2 text-left text-xl font-medium text-[#0C3712] hover:bg-[#BCF0C4] focus:outline-none focus-visible:ring focus-visible:ring-[#2DD246]">
                <span>{title}</span>
                <ChevronIcon
                  className={"transition-transform duration-300 "+`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-[#2DD246] fill-[#2DD246]`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-300 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-150 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-md text-gray-500 bg-[#F2FDF3]">
                {text}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        </div>
  )
}
