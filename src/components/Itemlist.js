// import React, { useState, useEffect } from "react";
// import { CDN_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { addItems } from "../utils/cartslice";

// const Itemlist = ({ items }) => {
//   const dispatch = useDispatch();
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });

//   const handleAddItem = (item, event) => {
//     dispatch(addItems(item));
//     setSelectedItem(item);

//     // Calculate the position of the dialog box
//     const itemBounds = event.target.getBoundingClientRect();
//     const containerBounds = event.currentTarget.getBoundingClientRect();

//     const top = itemBounds.top - containerBounds.top + itemBounds.height / 2;
//     const left = itemBounds.left - containerBounds.left + itemBounds.width / 2;

//     setDialogPosition({ top, left });
//   };

//   // Hide the dialog after 3 seconds
//   useEffect(() => {
//     if (selectedItem) {
//       const timeout = setTimeout(() => {
//         setSelectedItem(null);
//       }, 3000);

//       return () => clearTimeout(timeout);
//     }
//   }, [selectedItem]);

//   return (
//     <div>
//       {items.map((item) => (
//         <div
//           key={item.card.info.id}
//           className="p-2 m-2 border border-black border-b-2 text-left flex justify-between relative"
//         >
//           <div className="w-9/12">
//             <div className="py-2">
//               <span>{item.card.info.name}</span>
//               <span>
//                 - ₹
//                 {item.card.info.price
//                   ? item.card.info.price / 100
//                   : item.card.info.defaultPrice / 100}
//               </span>
//             </div>
//             <p className="text-xs">{item.card.info.description}</p>
//           </div>
//           <div className="w-3/12 p-4">
//             <div className="absolute">
//               <button
//                 className="p-2 bg-black text-white shadow-lg mx-16 rounded-lg whitespace-nowrap"
//                 onClick={(e) => handleAddItem(item, e)}
//               >
//                 Add +
//               </button>
//             </div>
//             <img src={CDN_URL + item.card.info.imageId} className="w-full" />
//           </div>

//           {/* Dialog Box */}
//           {selectedItem && selectedItem.card.info.id === item.card.info.id && (
//             <div
//               className="absolute top-0 left-0 bg-gray-900 p-4 border shadow-lg text-white"
//               style={{
//                 top: dialogPosition.top,
//                 left: dialogPosition.left,
//                 transform: "translate(-50%, -50%)",
//               }}
//             >
//               <p>Your item has been added to the cart!</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Itemlist;

import React from "react"
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartslice";

const Itemlist = ({ items }) => {

    const dispatch =useDispatch();

  const handleadditem = (item)=>{
    dispatch(addItems(item))
  }

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className=" p-2 m-2 border border-black border-b-2 text-left flex justify-between"
        >

          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className=" absolute">
              <button className="p-2 bg-black text-white shadow-lg mx-16 rounded-lg"
              onClick={()=>handleadditem(item)}>
                Add +
              </button>
            </div>
            <img src={CDN_URL + item.card.info.imageId} className="w-full" />

          </div>

        </div>
      ))}
    </div>
  );
};

export default Itemlist
