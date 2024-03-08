import Navbar from "./component/Navbar";
import ChatScreen from "./component/chatScreen";

export default function Home() {
 return (
   <main className="p-5 h-screen bg-gray-100">
     <div className="flex w-full h-full justify-between flex-col">
       <div>
         <Navbar />
       </div>
       <div className="h-full">
         <ChatScreen />
       </div>
     </div>
   </main>
 );
}