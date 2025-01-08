import ChatListing from "../components/chatListing/ChatListing"
import ChatBox from "../components/chatSection/CharBox"
import Header from "../components/Header"

const Home = () => {

    return (
        <>
            <Header />
            <div className="relative space-x-0 bg-[url('../src/assets/background.jpg')] bg-cover bg-center flex w-full h-screen">
                <ChatListing />
                <ChatBox />
            </div>
        </>
    )
}

export default Home