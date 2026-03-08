import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white border-primary-400 bg-primary-500/20"
    : "text-slate-300 border-slate-600/70 hover:border-secondary-400/70";

  return (
    <button
      className={`${buttonStyles} cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold tracking-wide transition`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
