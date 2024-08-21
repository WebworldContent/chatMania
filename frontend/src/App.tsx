import ChatListing from "./components/chatListing/ChatListing";
import CharBox from "./components/chatSection/CharBox";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <div className="relative space-x-0 bg-[url('../src/assets/background.jpg')] bg-cover bg-center flex w-full h-screen">
        <ChatListing />
        <CharBox />
      </div>
    </>
  )
}