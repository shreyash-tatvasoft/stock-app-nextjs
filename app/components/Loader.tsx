const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-opacity-30 bg-transparent fixed top-0 left-0 right-0 bottom-0 z-50">
      <div
        className={`border-4 border-blue-500 border-t-transparent rounded-full animate-spin w-16 h-16`}
      ></div>
    </div>
  );
}

export default Loader