import axios from "axios";
import { FormEvent } from "react";

export const SubmitVideoUrl = async (event: FormEvent, videoUrl: string) => {
      event.preventDefault();

    const part = 'youtube.com/watch?v='
    const part2 = 'youtu.be/'

    if(!(videoUrl.includes(part)) && !(videoUrl.includes(part2))) {
      alert('Not a valid youtube URL')
    }


    else {
    const response = await axios.post("http://localhost:5001/api", { url: videoUrl });
    alert("Video URL submitted successfully!");
    console.log(response.data);

    return response.data;
    }
  
}
