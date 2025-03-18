import { Logo } from "./Logo"

export const Navbar = () => {

    return (
    
        <nav className='px-30 py-4 h-full flex items-center justify-between bg-white shadow-md'>
            
            <Logo />

            <ul className="flex gap-3 space-x-6 list-none">
                <li>
                    <a className= "text-lg" href="/DisplayRecipesPage">Your Summaries</a>
                </li>
                <li>
                    <a className= "text-lg" href="/AboutPage">About</a>
                </li>
            </ul>
        </nav>
    
)
}