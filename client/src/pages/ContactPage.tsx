import { Icon } from "../components/Icon"
import { Navbar } from "../components/Navbar"
import { PageBackground } from "../components/PageBackground"

export default function ContactPage() {
    return (
        <div>
      <Navbar/>
    <div className="flex flex-col items-center justify-center h-full overflow-hidden"> 
        <PageBackground/>

        <div>
            <div className='flex items-center justify-center mt-30'>
                <Icon/>
            </div>
        
    </div>
    </div>

    </div>
    )
}