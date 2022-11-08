const ChevronDown = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="20"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="20"
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
};

export default ChevronDown;
