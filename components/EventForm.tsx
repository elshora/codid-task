"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Select from "react-select";

interface FormData {
  title: string;
  eventType: string;
  sourcingStrategy: string;
  description: string;
  [key: string]: string | { value: string; label: string } | null;
}
interface Attachment {
  title: string;
  eventType: string;
  sourcingStrategy: string;
  description: string;
}
interface EventFormProps {
  toggleModal: () => void;
  attachmentData: Attachment[];
  setAttachmentData: React.Dispatch<React.SetStateAction<Attachment[]>>;
}
const updateEventsInLocalStorage = (updatedData: Attachment[]) => {
  localStorage.setItem("eventsData", JSON.stringify(updatedData));
};

const EventForm: React.FC<EventFormProps> = ({
  toggleModal,
  setAttachmentData,
  attachmentData,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    eventType: "",
    sourcingStrategy: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const eventTypeOptions = [
    { value: "conference", label: "Conference" },
    { value: "workshop", label: "Workshop" },
    { value: "meeting", label: "Meeting" },
  ];

  const sourcingStrategyOptions = [
    { value: "internal", label: "Internal" },
    { value: "external", label: "External" },
  ];

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const newEvents: Attachment[] = [...attachmentData, formData];
      updateEventsInLocalStorage(newEvents);
      setAttachmentData(newEvents as Attachment[]);
      toggleModal();
      setFormData({
        title: "",
        eventType: "",
        sourcingStrategy: "",
        description: "",
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-600"
        >
          Event Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Please Type Attachment title"
          value={formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("title", e.target.value)
          }
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.title && <span className="text-red-500">{errors.title}</span>}
      </div>

      <div className="mb-4">
        <label
          htmlFor="eventType"
          className="block text-sm font-semibold text-gray-600"
        >
          Event Type:
        </label>
        <Select
          id="eventType"
          options={eventTypeOptions}
          placeholder="Please Select Event Type"
          //   value={formData.eventType}
          onChange={(selectedOption) =>
            handleChange("eventType", selectedOption?.value ?? "")
          }
          className="mt-1 w-full"
        />
        {errors.eventType && (
          <span className="text-red-500">{errors.eventType}</span>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="sourcingStrategy"
          className="block text-sm font-semibold text-gray-600"
        >
          Sourcing Strategy:
        </label>
        <Select
          id="sourcingStrategy"
          placeholder="Please Select Sourcing Strategy"
          options={sourcingStrategyOptions}
          //   value={formData.sourcingStrategy}
          onChange={(selectedOption) =>
            handleChange("sourcingStrategy", selectedOption?.value ?? "")
          }
          className="mt-1 w-full"
        />
        {errors.sourcingStrategy && (
          <span className="text-red-500">{errors.sourcingStrategy}</span>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-600"
        >
          Description:
        </label>
        <textarea
          id="description"
          placeholder="Please Select REquest Description"
          value={formData.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleChange("description", e.target.value)
          }
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description}</span>
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-300 text-white px-7 py-2 rounded"
          onClick={toggleModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-7 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EventForm;
