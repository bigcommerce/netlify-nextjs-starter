const Info = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <circle cx="12" cy="12" fill="transparent" r="10" />
      <path d="M12 8v4" stroke="currentColor" />
      <path d="M12 16h.01" stroke="currentColor" />
    </svg>
  );
};

export default Info;
