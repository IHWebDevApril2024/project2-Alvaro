import supabase from "../utils/config";

const DetailsBook = ({ bookDetail, showModalDetails, setShowModalDetails, handleSarch, fetchData }) => {
    const closeModal = () => {
        showModalDetails && setShowModalDetails(!showModalDetails)
    };

    const handleDelete = async (bookDetail) => {
        const { error } = await supabase
            .from("books")
            .delete()
            .eq("id", bookDetail.id)
        if (error) {
            console.log(error);
        }
        closeModal();
        const url_split = window.location.href.split("/");
        url_split[url_split.length - 1] === "books" ? handleSarch() : fetchData();
    };

    return (
        <div className="details-container">
            <div className="details-modal">
                <img src={bookDetail.image} alt="book detail image" />
                <div className="details-info-container">
                    <h3>{bookDetail.title}</h3>
                    <h4>{bookDetail.author === undefined ? "Unknown" : (bookDetail.author.length === 0 ? "Unknown" : bookDetail.author[0])}</h4>
                    <h4>{bookDetail.subjects === undefined ? "Unknown" : (bookDetail.subjects.length === 0 ? "Unknown" : bookDetail.subjects[0])}</h4>
                    <h5>{bookDetail.isbn13}</h5>
                    <h5>{bookDetail.publisher}</h5>
                    <h5>{bookDetail.date_published}</h5>
                    <h5>{bookDetail.pages}</h5>
                    <p>{bookDetail.synopsis}</p>
                    <button onClick={closeModal}>Close Details</button>
                    <button onClick={() => handleDelete(bookDetail)}>Delete Book</button>
                    <button>Update</button>
                    <button>Buy</button>
                </div>
            </div>
        </div>
    )
}

export default DetailsBook;