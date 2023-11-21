import { Trash, UploadCloud } from "lucide-react";
import React, { useState } from "react";

interface FileInputFormProps {
  toggleModal: () => void;
}

const DocumentForm: React.FC<FileInputFormProps> = ({ toggleModal }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log("Form Data:", formData);
      toggleModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto  ">
      <div className="flex flex-col items-center mb-4 rounded border-dashed border bg-gray-200 border-blue-500 py-20 px-8">
        <UploadCloud />
        <label className="block text-gray-500  mb-2">
          Drop Files To Upload Or Click
        </label>
        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-blue-400 hover:bg-blue-700 text-white py-1 px-4 rounded"
        >
          Upload Files
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        {file && (
          <span className="ml-4">
            {file.name}{" "}
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-red-500"
            >
              <Trash />
            </button>
          </span>
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
          Confirm
        </button>
      </div>
    </form>
  );
};

export default DocumentForm;
