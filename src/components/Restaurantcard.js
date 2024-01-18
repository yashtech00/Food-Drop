import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resdata } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    resdata.info;
  const { deliveryTime } = resdata?.info.sla;
  return (
    
    <div
      data-testid="rescard"
      className="res-card m-6 p-4 w-[250px] justify-between bg-gray-100 rounded-lg hover:bg-gray-300"
      >
      <img
        className="res-logo rounded-lg h-60"
        src={CDN_URL + resdata.info.cloudinaryImageId}
      />
      <h3 className=" font-semibold py-1 text-xl">{name}</h3>
      <div className=" font-normal py-4">
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating}</h4>
        <h4>{costForTwo}</h4>
        <h4>{deliveryTime}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
