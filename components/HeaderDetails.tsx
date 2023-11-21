import React, { useState } from "react";

interface AccordionProps {
  title: string;
  content: React.ReactNode;
}

const HeaderDetails: React.FC<AccordionProps> = ({ title, content }) => {
  const [isActive, setIsActive] = useState(true);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="border rounded mb-4 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 bg-gray-100 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="font-semibold">{title}</div>
        <div
          className={`transform ${
            isActive ? "rotate-90" : "rotate-0"
          } transition-transform`}
        >
          &#9658;
        </div>
      </div>
      {isActive && <div className="p-4 bg-white">{content}</div>}
    </div>
  );
};

export default HeaderDetails;
