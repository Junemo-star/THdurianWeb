import ReactStars from "react-rating-stars-component";

const RatingStarss = ({ ratingChanged, starrr }) => {
    // const ratingChanged = (newRating) => {
    //     console.log(newRating);
    // };

    return (
        <ReactStars
            value={starrr}
            count={5}
            onChange={ratingChanged}
            size={50}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            // activeColor="#FFEF60"
            activeColor="#8F3E00"
        />
    );
};

export default RatingStarss;
