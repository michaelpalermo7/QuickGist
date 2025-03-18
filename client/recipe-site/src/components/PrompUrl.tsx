import { useState } from "react";

export default function SubmitHandler() {
  alert('submitted')
}


export const Header = () => {
  const [videoUrl, setVideoUrl] = useState("");

    return (

    <div className="w-[600px] h-[180px] p-6 ml-20 mt-45 rounded-lg shadow-lg bg-white">

      <h1 className='text-center text-3xl font-extrabold text-gray-800 tracking-wide'>
        Enter a URL
      </h1>

      <div className="px-6 py-4">
        <form onSubmit={SubmitHandler}>
         <input
          type="text"
          placeholder="Enter YouTube URL..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button type='submit' className="w-full px-6 py-2 bg-rose-500 mt-3 text-white font-semibold rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-75 transition ease-in-out duration-200">
          Get Gist
        </button>
        </form>   
</div>
    </div>
    )

}