import RestaurantCard from "./Restaurantcard";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import  Shimmer  from "./Shimmer";


const Body = () => {
  const [res, setres] = useState([]); //mainlist

  const [filteredRest, setfilteredRest] = useState([]); //filter list

  const [searchlist, setsearchlist] = useState(""); //search list

 

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();

      // Update the path to access the data
      const extractedData =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle;

      setres(extractedData?.restaurants || []);
      setfilteredRest(extractedData?.restaurants || []);
    } catch (error) {

    }
  };
  
  return !res || res.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body min-h-full relative  mb-[96px]">
      {/* {bg - gradient - to - b from-black} */}
      <div className="filter flex ">
        <img
          src="https://png.pngtree.com/background/20210711/original/pngtree-simple-food-top-view-banner-picture-image_1068662.jpg"
          className=" w-screen"
        />
        <div className="absolute mx-96 mt-28 ">
          <div className="text-3xl font-semibold">
            <span className=" block italic">
              Bringing the world to your table – where every dish is a story,
              and every delivery is an experience.
            </span>
            {/* <span className=" block">
                any Meal
              </span> */}
          </div>

          <div className="search p-4 text-center mt-6">
            <input
              type="text"
              data-testid="searchInput"
              placeholder="Search any restuarant"
              className=" mr-3 rounded-3xl p-3 w-[70%]"
              value={searchlist}
              onChange={(e) => {
                setsearchlist(e.target.value);
              }}
            />

            {/* search button */}

            <button
              className="px-6 bg-white rounded-3xl p-3 text-black font-bold"
              onClick={() => {
                const filtered = res.filter((rest) =>
                  rest.info.name
                    .toLowerCase()
                    .includes(searchlist.toLowerCase())
                );

                setres(filtered);
              }}
            >
              Search
            </button>
          </div>
          <div className=" m-6 p-6 text-center ">
            <button
              className="filter-btn bg-white px-8 py-3 rounded-lg text-black font-semibold "
              onClick={() => {
                const filterbt = res.filter((ress) => ress.info.avgRating > 4);
                setres(filterbt);
              }}
            >
              Top rated Resturants
            </button>
          </div>
        </div>
      </div>
        <div className="res-container flex flex-wrap ">
          
        {res.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resdata={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
