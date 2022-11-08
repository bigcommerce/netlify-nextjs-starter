const ArrowLeft = ({ ...props }) => {
  return (
    <svg fill="none" height="24" stroke="currentColor" viewBox="0 0 24 24" width="24" {...props}>
      <path d="M19 12H5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
};

export default ArrowLeft;
