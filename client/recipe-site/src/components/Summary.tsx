export const Form = () => {
  return (
    <div className="w-[600px] h-[450px] p-6 -ml-0 mt-8 rounded-lg shadow-lg bg-white mt-20" >
      <div className="py-1">
      </div>
      <div className="bg-transparent rounded-lg h-[350px] overflow-y-auto">
        <p className="text-gray-700 text-md">Summary of the video will appear here...</p>
      </div>

      <div className="flex mt-3 justify-center space-x-3">
        <button className="px-6 py-2 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-200">
        Save Summary
        </button>
    </div>
  
  </div>


     
  );
};
