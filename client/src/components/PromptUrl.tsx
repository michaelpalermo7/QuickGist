import { useState } from "react";
import { FormEvent } from "react";
import { SubmitVideoUrl } from "../services/api/SubmitVideoUrl";

interface PromptUrlProps {
  setSummary: React.Dispatch<React.SetStateAction<string>>;
}

export const PromptUrl = ({ setSummary }: PromptUrlProps) => {
  const [videoUrl, setVideoUrl] = useState("");

  const SubmitHandler = async (event: FormEvent, videoUrl: string) => {
  const data = await SubmitVideoUrl(event,videoUrl)
  if (data && data.aiOutput) {
    setSummary(data.aiOutput); // Update summary with the aiOutput value
  } else {
    setSummary("No summary available.");
  }
  }

    return (

    <div className="w-[600px] h-[180px] p-6 ml-20 mt-45 rounded-lg shadow-lg bg-white">

      <h1 className='text-center text-3xl font-extrabold text-gray-800 tracking-wide'>
        Enter a URL
      </h1>

      <div className="px-6 py-4">
        <form onSubmit={(e) => SubmitHandler(e, videoUrl)}>
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