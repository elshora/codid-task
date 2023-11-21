// EventForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import Select from "react-select";

interface FormData {
  title: string;
  eventType: { value: string; label: string } | null;
  sourcingStrategy: { value: string; label: string } | null;
  description: string;
  [key: string]: string | { value: string; label: string } | null;
}

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    eventType: null,
    sourcingStrategy: null,
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

  const handleChange = (
    name: string,
    value: string | { value: string; label: string }
  ) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Basic form validation
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const oldEvents: any = localStorage.getItem("eventData") ?? {};

      console.log(oldEvents);

      localStorage.setItem(
        "eventData",
        JSON.stringify(
          oldEvents?.length ? [...JSON.parse(oldEvents), formData] : [formData]
        )
      );

      // Reset form
      setFormData({
        title: "",
        eventType: null,
        sourcingStrategy: null,
        description: "",
      });

      // Clear errors
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
          value={formData.eventType}
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
          options={sourcingStrategyOptions}
          value={formData.sourcingStrategy}
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
