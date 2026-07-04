import Header from './Header'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function HomePage({isDark,setIsDark, user}){
    const navigate = useNavigate();
    return (
        
        <div className="min-h-screen  dark:bg-[#17171d] ">
            <Header isDark={isDark} setIsDark={setIsDark} user={user}/>
            <div > 
                <h1 className="flex justify-center text-5xl mt-[100px] dark:text-white">Debug code Faster with AI</h1>
                <p className="flex justify-center mt-8 dark:text-white">AI-powered code analysis.</p>
                <p className="flex justify-center mt-1 dark:text-white"> Find bugs, understand complexity, write better code..</p>
            </div>

            <div className="flex justify-center gap-16 mt-16">
            <div className="text-center">
                <p className="text-4xl font-bold text-green-700">10+</p>
                <p className="text-gray-400">Languages</p>
            </div>
            <div className="text-center">
                <p className="text-4xl font-bold text-green-700">AI</p>
                <p className="text-gray-400">Powered</p>
            </div>
            <div className="text-center">
                <p className="text-4xl font-bold text-green-700">Free</p>
                <p className="text-gray-400">To Use</p>
            </div>
            </div>
            
            <div className="flex">
                <Button variant='outline' className="bg-blue-500 mt-10 mx-auto text-white border-green-500s" onClick={() => navigate(user?"/Analysis":"/login")}>
                    Start Debuging →
                </Button>
            </div>
            
        </div>
    )
}
export default HomePage