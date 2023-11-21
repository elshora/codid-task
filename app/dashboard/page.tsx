"use client";
import DocumentForm from "@/components/DocumentForm";
import EventForm from "@/components/EventForm";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import ReactSelect, { ActionMeta, SingleValue } from "react-select";
interface Selection {
  value: string;
  label: string;
}
const AttachmentOptions: Selection[] = [
  { value: "1", label: "Event" },
  { value: "2", label: "Document" },
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("1");
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSelection = (selectedType: SingleValue<Selection>): void => {
    setSelectedType(selectedType?.value ?? "1");
  };
  return (
    <div>
      <div className="mb-8 space-y-4">
        <header>
          <MoveLeft className="inline-block px-1" />
          <h3 className="text-1xl font-semibold text-start inline-block">
            Create Project
          </h3>
        </header>
        <div className="bg-white p-4 shadow-md">
          <div className="mt-4 flex justify-end">
            <button
              className="bg-transparent border border-blue-200 text-blue-500 px-4 py-2 mr-2 rounded"
              onClick={toggleModal}
            >
              Create
            </button>
            <button className="bg-transparent border border-blue-200 text-blue-500 px-4 py-2 rounded">
              Manage
            </button>
          </div>
        </div>
        {/* Modal container */}
        <div className={`modal ${isModalOpen ? "block" : "hidden"}`}>
          <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h5 className="font-semibold pb-3">Create Attachment</h5>
              <ReactSelect
                options={AttachmentOptions}
                defaultValue={AttachmentOptions[0]}
                onChange={handleSelection}
              />
              <div className="bg-white p-8 rounded-md w-full sm:w-96">
                {selectedType === "1" ? <EventForm /> : <DocumentForm />}
              </div>
              <button
                onClick={toggleModal}
                className="bg-transparent border border-blue-200 text-blue-500 px-4 py-2 rounded mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
