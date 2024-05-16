import { useEffect, useState } from "react";
import supabase from "../utils/config";
import BookCard from "../components/BookCard";
import DetailsBook from "../components/DetailsBook";
import "../styles/pages/AllBooksPage.css"

const AllBooksPage = ({ searchString, handleSearchString }) => {
    const [arrayBooks, setArrayBooks] = useState([]);
    const [bookDetail, setBookDetail] = useState({});
    const [showModalDetails, setShowModalDetails] = useState(false);

    const handleSarch = async () => {
        if (searchString === "") {
            fetchData();
        } else {
            const { data, error } = await supabase
                .from("books")
                .select()
                .order("id", { ascending: false })
                .ilike("title", `%${searchString}%`);
            if (error) {
                console.log(error);
            } else {
                setArrayBooks(data);
            }
        }
    };

    const fetchData = async () => {
        if (searchString === "") {
            const { data, error } = await supabase
                .from("books")
                .select()
                .order("id", { ascending: false })
                .limit(200);
            if (error) {
                console.log(error);
                return
            } else {
                setArrayBooks(data);
                return
            }
        } else {
            handleSarch();
        }
    };

    useEffect(() => {
        fetchData();
        window.scroll({
            top: 0,
            left: 0,
            behavior: "instant",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (arrayBooks.length !== 0) {
        return (
            <div className="allbookspage" >
                <div className="searchbar-container">
                    <input onChange={handleSearchString} className="searchinput-allpages" type="text" name="bookSearch" placeholder="Look for a title" value={searchString} onKeyUp={(e) => e.key === "Enter" && handleSarch()} />
                    <div className="homepage-minorr">
                        <button className="button-allpages" onClick={handleSarch}><span>Search</span><i></i></button>
                    </div>
                </div>
                <div className="bookshelf-allbooks">
                    {
                        arrayBooks.map(book => {
                            return (
                                <BookCard key={book.id} book={book} showModalDetails={showModalDetails} setShowModalDetails={setShowModalDetails} setBookDetail={setBookDetail} fetchData={fetchData} />
                            )
                        })
                    }
                    {showModalDetails && <DetailsBook bookDetail={bookDetail} showModalDetails={showModalDetails} setShowModalDetails={setShowModalDetails} searchString={searchString} handleSarch={handleSarch} />}
                </div>
            </div>
        )
    } else {
        return (
            <div className="allbookspage" >
                <div className="searchbar-container">
                <input onChange={handleSearchString} className="searchinput-allpages" type="text" name="bookSearch" placeholder="Look for a title" value={searchString} onKeyUp={(e) => e.key === "Enter" && handleSarch()} />
                    <div className="homepage-minorr">
                        <button className="button-allpages" onClick={handleSarch}><span>Search</span><i></i></button>
                    </div>
                </div>
                <div className="nobooks">
                    No Books Found
                </div>
            </div>
        )
    }
}

export default AllBooksPage;