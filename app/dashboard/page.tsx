"use client";
import DataTable from "@/components/DataTable";
import DocumentForm from "@/components/DocumentForm";
import EventForm from "@/components/EventForm";
import HeaderDetails from "@/components/HeaderDetails";
import HeaderForm from "@/components/HeaderFrom";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ReactSelect, { SingleValue } from "react-select";
interface Selection {
  value: string;
  label: string;
}
const AttachmentOptions: Selection[] = [
  { value: "1", label: "Event" },
  { value: "2", label: "Document" },
];
interface Attachment {
  title: string;
  eventType: string;
  sourcingStrategy: string;
  description: string;
}
export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("1");

  const getEventsFromLocalStorage = () => {
    const data = localStorage.getItem("eventsData");
    return data ? JSON.parse(data ?? "[]") : [];
  };
  const [attachmentData, setAttachmentData] = useState<Attachment[]>([]);
  useEffect(() => {
    const eventsData = getEventsFromLocalStorage();
    setAttachmentData(eventsData);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSelection = (selectedType: SingleValue<Selection>): void => {
    setSelectedType(selectedType?.value ?? "1");
  };
  const AttachmentDetails = () => (
    <div className="bg-white p-4">
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
      {/* @ts-ignore */}
      <DataTable attachmentData={attachmentData} />
    </div>
  );
  return (
    <div>
      <div className="mb-8 space-y-4">
        <header className=" border-b bg-gray-50 border-gray-200 py-3 mb-5">
          <MoveLeft className="inline-block px-1" />
          <h3 className="text-1xl font-semibold text-start inline-block ">
            Create Project
          </h3>
        </header>
        <section className="my-5">
          <HeaderDetails title="Header Details" content={<HeaderForm />} />
        </section>
        <section className="my-5">
          <HeaderDetails title="Attachments" content={<AttachmentDetails />} />
        </section>

        {/* Modal container */}
        <div className={`modal ${isModalOpen ? "block" : "hidden"}`}>
          <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h5 className="font-semibold mb-3 pb-3 border-b border-gray-200">
                Create Attachment
              </h5>
              <ReactSelect
                options={AttachmentOptions}
                defaultValue={AttachmentOptions[0]}
                onChange={handleSelection}
              />
              <div className="bg-white py-8 rounded-md w-full sm:w-96">
                {selectedType === "1" ? (
                  <EventForm
                    toggleModal={toggleModal}
                    setAttachmentData={setAttachmentData}
                    attachmentData={attachmentData}
                  />
                ) : (
                  <DocumentForm />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
