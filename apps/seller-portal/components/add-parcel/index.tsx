import { Dispatch, Fragment, SetStateAction, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { useFormik } from 'formik';
import { AddParcelSchema } from './add-parcel-schema';
interface AddParcelProps {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  onParcelCreate: (data: {
    consigneeName: string;
    from: string;
    to: string;
  }) => void;
}

function AddParcel({ open, setOpen, onParcelCreate }: AddParcelProps) {
  const formik = useFormik({
    initialValues: {
      consigneeName: '',
      from: '',
      to: '',
    },
    validationSchema: AddParcelSchema,
    onSubmit: (values) => {
      onParcelCreate(values);
      formik.resetForm();
    },
  });
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => {
          formik.resetForm();
          setOpen(false);
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={formik.handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckIcon
                        className="h-6 w-6 text-teal-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Create New Parcel
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="mb-4">
                          <label className="sr-only">Consignee Name</label>
                          <input
                            name="consigneeName"
                            type="text"
                            className="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border  ring-1 sm:text-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-none"
                            placeholder="Consignee Name"
                            onChange={formik.handleChange}
                            value={formik.values.consigneeName}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.consigneeName &&
                            formik.errors.consigneeName && (
                              <p className="mt-1 text-red-500 text-sm">
                                Consignee Name is required
                              </p>
                            )}
                        </div>
                        <div className="mb-4">
                          <label className="sr-only">From</label>
                          <input
                            name="from"
                            type="text"
                            className="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border  ring-1 sm:text-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-none"
                            placeholder="From"
                            onChange={formik.handleChange}
                            value={formik.values.from}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.from && formik.errors.from && (
                            <p className="mt-1 text-red-500 text-sm">
                              From is required
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="sr-only">To</label>
                          <input
                            name="to"
                            type="text"
                            className="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border  ring-1 sm:text-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-none"
                            placeholder="To"
                            onChange={formik.handleChange}
                            value={formik.values.to}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.to && formik.errors.to && (
                            <p className="mt-1 text-red-500 text-sm">
                              To is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Create Parcel
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      formik.resetForm();
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AddParcel;
