import Header from "./components/Header";
import SecondSection from "./components/SecondSection";
import Welcome from "./components/Welcome";


function App() {
  return (
    <div className="App font-space">
      <Header />
      <Welcome />
      <SecondSection />
      <div className="w-screen h-screen"></div>

    </div>
  );
}

export default App;
