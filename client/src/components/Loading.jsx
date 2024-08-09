const LoadingAnimation = () => {
    return (
      <div className="flex justify-center items-center h-16 space-x-2">
        <div className="bg-blue-500 h-3 w-3 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="bg-blue-500 h-3 w-3 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="bg-blue-500 h-3 w-3 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    );
  };
  
  export default LoadingAnimation;
  