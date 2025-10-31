import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNavbar from "./components/BottomNavbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ReadingList from "./pages/ReadingList";
import BookDetails from "./pages/BookDetails";
import { SearchProvider } from "./contexts/SearchContext";
import { ReadingListProvider } from "./contexts/ReadingListContext";

function App() {
  return (
    <ReadingListProvider>
      <SearchProvider>
        <Router>
          <div className="min-h-screen pb-16">
            {" "}
            {/* Add padding bottom to account for fixed navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/reading-list" element={<ReadingList />} />
              <Route path="/book/:workKey" element={<BookDetails />} />
            </Routes>
            <BottomNavbar />
          </div>
        </Router>
      </SearchProvider>
    </ReadingListProvider>
  );
}

export default App;
