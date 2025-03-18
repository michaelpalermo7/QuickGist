import { Header } from "../components/PrompUrl";
import { Form } from "../components/Summary";
import { PageBackground } from "../components/PageBackground";

export const HomePage = () => {
  return (
    
    <div className="flex flex-col h-full overflow-hidden"> 
        <PageBackground/>

      {/* Main content with Header and Form */}
      <div className="flex gap-x-2 h-full pb-3 pt-3">
        
        {/* Header on the left (50% of the screen) */}
        <div className="flex items-start justify-center w-1/2 bg-transparent p-6">
          <Header />
        </div>

        {/* Form on the right (50% of the screen) */}
        <div className="w-1/2 bg-transparent p-6">
          <Form />
        </div>
      </div>

   
    </div>
  );
};
