import Header from './Header'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Zap, Shield, Code, Lightbulb, ChevronRight } from "lucide-react";

function HomePage({isDark,setIsDark, user}){
    const navigate = useNavigate();
    return (
        
        <div className="min-h-screen  dark:bg-[#17171d] ">
            <Header isDark={isDark} setIsDark={setIsDark} user={user}/>
            
            {/* ===== HERO SECTION ===== */}
            <div className="px-4 py-12"> 
                <h1 className="text-center text-5xl font-bold mt-16 dark:text-white">Debug code Faster with AI</h1>
                <p className="text-center mt-6 dark:text-white text-lg">AI-powered code analysis.</p>
                <p className="text-center mt-2 dark:text-white text-lg"> Find bugs, understand complexity, write better code.</p>
            </div>

            {/* ===== STATS SECTION ===== */}
            <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20 mt-12 px-4">
                <div className="text-center">
                    <p className="text-4xl font-bold text-green-700">10+</p>
                    <p className="text-gray-400 mt-2">Languages</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-bold text-green-700">AI</p>
                    <p className="text-gray-400 mt-2">Powered</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-bold text-green-700">Free</p>
                    <p className="text-gray-400 mt-2">To Use</p>
                </div>
            </div>
            
            {/* ===== MAIN CTA BUTTON ===== */}
            <div className="flex justify-center mt-12 px-4">
                <Button variant='outline' className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600 font-semibold" onClick={() => navigate(user?"/Analysis":"/login")}>
                    Start Debuging →
                </Button>
            </div>

            {/* ===== FEATURES SECTION START ===== */}
            <div className="mt-20 px-4">
                <h2 className="text-4xl font-bold text-center dark:text-white mb-12">Why Choose CodeScan AI?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {/* Feature Card 1 */}
                    <div className="p-6 rounded-lg bg-gray-100 dark:bg-[#1f1f2e] border border-gray-200 dark:border-gray-700">
                        <Zap className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-lg font-semibold dark:text-white mb-2">Fast Analysis</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Get instant bug detection and analysis in seconds</p>
                    </div>
                    {/* Feature Card 2 */}
                    <div className="p-6 rounded-lg bg-gray-100 dark:bg-[#1f1f2e] border border-gray-200 dark:border-gray-700">
                        <Shield className="w-8 h-8 text-green-500 mb-4" />
                        <h3 className="text-lg font-semibold dark:text-white mb-2">Secure</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Find security vulnerabilities before they become issues</p>
                    </div>
                    {/* Feature Card 3 */}
                    <div className="p-6 rounded-lg bg-gray-100 dark:bg-[#1f1f2e] border border-gray-200 dark:border-gray-700">
                        <Code className="w-8 h-8 text-purple-500 mb-4" />
                        <h3 className="text-lg font-semibold dark:text-white mb-2">Languages</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Support for 10+ programming languages</p>
                    </div>
                    {/* Feature Card 4 */}
                    <div className="p-6 rounded-lg bg-gray-100 dark:bg-[#1f1f2e] border border-gray-200 dark:border-gray-700">
                        <Lightbulb className="w-8 h-8 text-yellow-500 mb-4" />
                        <h3 className="text-lg font-semibold dark:text-white mb-2">Suggestions</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Get AI-powered recommendations to improve code quality</p>
                    </div>
                </div>
            </div>
            {/* ===== FEATURES SECTION END ===== */}

            {/* ===== HOW IT WORKS SECTION START ===== */}
            <div className="mt-20 px-4 pb-12">
                <h2 className="text-4xl font-bold text-center dark:text-white mb-12">How It Works</h2>
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-lg font-semibold dark:text-white mb-2">Paste Your Code</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Share your code snippet or upload a file</p>
                        </div>
                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-lg font-semibold dark:text-white mb-2">AI Analyzes</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Our AI scans for bugs, issues, and improvements</p>
                        </div>
                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-lg font-semibold dark:text-white mb-2">Get Results</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Review detailed report and apply suggestions</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* ===== HOW IT WORKS SECTION END ===== */}
            
        </div>
    )
}
export default HomePage