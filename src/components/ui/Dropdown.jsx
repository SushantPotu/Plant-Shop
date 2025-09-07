import React, { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const dropdownClasses = cva(
  'relative inline-block text-left transition-all duration-200 focus:outline-none',
  {
    variants: {
      variant: {
        primary: 'focus:ring-2 focus:ring-green-500',
        secondary: 'focus:ring-2 focus:ring-gray-500',
      },
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const Dropdown = ({
  placeholder = "Show more",
  text_font_size = "14",
  text_font_family = "Open Sans",
  text_font_weight = "700",
  text_line_height = "20px",
  text_text_align = "center",
  text_text_transform = "capitalize",
  text_color = "#343434",
  fill_background_color = "#ffffff",
  border_border_radius = "0px",
  border = 'none',
  dropdown_align = "right", 
  layout_width,
  padding,
  margin,
  position,
  options = [],
  value,
  onChange,
  variant,
  size,
  disabled = false,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Validate optional Tailwind classes
  const optionalClasses = [
    layout_width ? `w-[${layout_width}]` : '',
    padding ? `p-[${padding}]` : '',
    margin ? `m-[${margin}]` : '',
    position ? position : '',
  ].filter(Boolean).join(' ');

  // Inline styles
  const dropdownStyles = {
    fontSize: `${text_font_size}px`,
    fontFamily: text_font_family,
    fontWeight: text_font_weight,
    lineHeight: text_line_height,
    textAlign: text_text_align,
    textTransform: text_text_transform,
    color: text_color,
    backgroundColor: fill_background_color,
    borderRadius: border_border_radius,
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (onChange) onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={twMerge(dropdownClasses({ variant, size }), optionalClasses, className)}
      {...props}
    >
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        style={{dropdownStyles, border: 'none'}}
        className="inline-flex justify-between items-center px-4 py-2 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{value || placeholder}</span>
        <svg
          className={`ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={twMerge(
            "absolute z-10 mt-2 w-[300px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none",
            dropdown_align == "left-0",
            //layout_width ? `w-[${layout_width}]` : 'w-full'
          )}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.length > 0 ? (
              options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No options available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
