import { Icon } from "../components/Icon"
import { Navbar } from "../components/Navbar"
import { PageBackground } from "../components/PageBackground"

export const AboutPage =() => {
    return (
        <div>
      <Navbar/>
    <div className="flex flex-col items-center justify-center h-full overflow-hidden"> 
        <PageBackground/>

        <div>
            <div className='flex items-center justify-center mt-30'>
                <Icon/>
            </div>
        
        
        <h1 className='text-center text-2xl font-bold mt-30 text-gray-800 tracking-wide'> 
            QuickGist allows you to turn youtube videos <br />
            into concise and informative summaries with <br/>
            the click of a button
            <br/>
            <br/>
            This simple process enhances efficiency for any task
        </h1>
    </div>
    </div>

    </div>
    )
}