import React from 'react';

// ClientCard — generic card with icon, title, description, and primary action
/**
 * @param {Object} props
 * @param {JSX.Element} props.icon
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.buttonText
 * @param {boolean} props.disabled
 * @param {() => void} props.onClick
 * @param {string} [props.testId]
 */
const ClientCard = ({ icon, title, description, buttonText, disabled, onClick, testId }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-black/10 p-5 md:p-6 flex flex-col" data-testid={testId}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
           aria-hidden="true">
        {icon}
      </div>
      <h3 className="font-montserrat text-lg font-semibold text-black">{title}</h3>
      <p className="font-opensans text-[#2C3E50] text-sm mt-2 flex-1">{description}</p>
      <button
        className={`mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md font-montserrat text-sm border ${disabled ? 'opacity-60 cursor-not-allowed border-black/20 text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}
        onClick={onClick}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </article>
  );
};

export default ClientCard;


