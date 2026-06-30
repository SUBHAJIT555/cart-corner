import React, { useState, useEffect } from "react";

interface CustomSelectProps {
  options: Array<{ label: string; value: string }>;
  onSelectChange?: (value: string) => void;
}

const CustomSelect = ({ options, onSelectChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option: { label: string; value: string }) => {
    setSelectedOption(option);
    onSelectChange?.(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as Element).closest(".minimal-select")) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown-content custom-select minimal-select relative" style={{ width: "110px" }}>
      <div
        className={`select-selected whitespace-nowrap ${isOpen ? "select-arrow-active" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {selectedOption.label}
      </div>
      <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
        {options.map((option, index) => (
          <div
            key={index}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              handleOptionClick(option);
            }}
            className={`select-item ${
              selectedOption.value === option.value ? "same-as-selected" : ""
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
