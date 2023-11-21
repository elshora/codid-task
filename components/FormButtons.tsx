import React from "react";

interface FormButtonsProps {
  onBack: () => void;
  onSaveAndClose: () => void;
  onNext: () => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  onBack,
  onSaveAndClose,
  onNext,
}) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        className="bg-gray-200 hover:bg-gray-400 text-gray-800  py-2 px-4 rounded"
        onClick={onBack}
      >
        Back
      </button>
      <div>
        <button
          className="bg-blue-400 hover:bg-blue-200 text-white py-2 px-4 rounded"
          onClick={onSaveAndClose}
        >
          Save and Close
        </button>
        <button
          className="bg-blue-400 hover:bg-blue-200 text-white py-2 px-4 rounded ml-2"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormButtons;
