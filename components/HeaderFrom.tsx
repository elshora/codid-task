import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import SelectField from "./SelectField";
import FormButtons from "./FormButtons";

const HeaderForm: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [currency, setCurrency] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [description, setDescription] = useState("");
  const [precedingDocument, setPrecedingDocument] = useState("");
  const [department, setDepartment] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [owner, setOwner] = useState("");
  const [sourcingStrategy, setSourcingStrategy] = useState("");

  const [errors, setErrors] = useState({
    projectTitle: "",
    currency: "",
    description: "",
    precedingDocument: "",
    department: "",
    owner: "",
    sourcingStrategy: "",
  });

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };

    // Validation logic for each field
    if (!projectTitle) {
      newErrors.projectTitle = "Project title is required";
      formIsValid = false;
    } else {
      newErrors.projectTitle = "";
    }

    if (!currency) {
      newErrors.currency = "Currency is required";
      formIsValid = false;
    } else {
      newErrors.currency = "";
    }

    if (!description) {
      newErrors.description = "Description is required";
      formIsValid = false;
    } else {
      newErrors.description = "";
    }
    if (!precedingDocument) {
      newErrors.precedingDocument = "Preceding Document is required";
      formIsValid = false;
    } else {
      newErrors.precedingDocument = "";
    }
    if (!department) {
      newErrors.department = "Department is required";
      formIsValid = false;
    } else {
      newErrors.department = "";
    }
    if (!owner) {
      newErrors.owner = "Owner is required";
      formIsValid = false;
    } else {
      newErrors.owner = "";
    }
    if (!sourcingStrategy) {
      newErrors.sourcingStrategy = "Sourcing Strategy is required";
      formIsValid = false;
    } else {
      newErrors.sourcingStrategy = "";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSaveAndClose = () => {
    if (validateForm()) {
      const formData = {
        projectTitle,
        currency,
        description,
        precedingDocument,
        department,
        owner,
        sourcingStrategy,
      };

      localStorage.setItem("formData", JSON.stringify(formData));
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <FormField
            label="Project Title"
            placeholder="Enter project title"
            value={projectTitle}
            onChange={setProjectTitle}
            error={errors.projectTitle}
          />
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700  mb-2">
              Description:
            </label>
            <textarea
              id="description"
              placeholder="Please Enter Description"
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              rows={4}
              className="w-full p-2 border rounded "
            />
            {errors.description && (
              <span className="text-red-500">{errors.description}</span>
            )}
          </div>
          <FormField
            label="Owner"
            placeholder="Enter owner"
            value={owner}
            onChange={setOwner}
            error={errors.owner}
          />
        </div>
        <div>
          <SelectField
            label="Currency"
            options={[
              { value: "usd", label: "USD" },
              { value: "eur", label: "EUR" },
            ]}
            value={currency}
            onChange={setCurrency}
            error={errors.currency}
          />
          <FormField
            label="Preceding Document"
            placeholder="Enter preceding document"
            value={precedingDocument}
            onChange={setPrecedingDocument}
            error={errors.precedingDocument}
          />
          <SelectField
            label="Department"
            options={[
              { value: "dept1", label: "Department 1" },
              { value: "dept2", label: "Department 2" },
            ]}
            value={department}
            onChange={setDepartment}
            error={errors.department}
          />
          <FormField
            label="Sourcing Strategy"
            placeholder="Enter sourcing strategy"
            value={sourcingStrategy}
            onChange={setSourcingStrategy}
            error={errors.sourcingStrategy}
          />
        </div>
      </div>

      {/* Form Buttons */}
      <FormButtons
        onBack={() => console.log("Back clicked")}
        onSaveAndClose={handleSaveAndClose}
        onNext={() => console.log("Next clicked")}
      />
    </div>
  );
};

export default HeaderForm;
