import { FaReact } from "react-icons/fa";
import ThemeToggle from "./Theme/ThemeToggle";
import Card from "./Component/Card";
import MainRoute from "./Routes/MainRoute";








function App() {
  return (
    <>
    <div className="w-full ">
      <div className="container mx-auto px-4 lg:px-8">


    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
<MainRoute/>
      <ThemeToggle />

      <Card />

 
      </div>
    </div>
    </>
  );
}

export default App;
