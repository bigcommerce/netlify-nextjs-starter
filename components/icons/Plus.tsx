const Plus = ({ ...props }) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" {...props}>
      <path
        d="M12 5V19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default Plus;
