import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Modal from "../../components/modal/Modal";

const Card = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderEquipment = (equipment) => {
    return equipment?.equipment?.map((item, index) => (
      <div key={index} className="playground">
        <p className={`ageClass ${item.EQUIPMENT_AGE_CLASS ? "hasAge" : ""}`}>
          {item.EQUIPMENT_AGE_CLASS}
        </p>
        <p className="descriptiontype">{item.TYPE_DESCRIPTION}</p>
        {/* <p>{item.MAINT_INFO}</p> */}
      </div>
    ));
  };
  const { name, equipment, surface } = props;
  // const firstItemCoordinates = surface?.the_geom?.coordinates[0][0];

  // const latitude = firstItemCoordinates[0][1];
  // const longitude = firstItemCoordinates[1][0];
  // console.log(latitude, "latitude sdlfjs;dlfj");

  // const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const firstItemCoordinates = surface?.the_geom?.coordinates?.[0]?.[0];

  // Check if firstItemCoordinates is defined and has the expected structure
  let latitude, longitude, googleMapsUrl;
  if (
    firstItemCoordinates &&
    Array.isArray(firstItemCoordinates) &&
    firstItemCoordinates.length >= 2
  ) {
    const latitude = firstItemCoordinates[0][1];
    const longitude = firstItemCoordinates[1][0];
    googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  } else {
    // Handle the case where coordinates are not available
    googleMapsUrl = "#"; // Default to a placeholder or error message
  }

  return (
    <div className="card">
      <div className="textContainer">
        <div className="nameContainer">
          <h3 className="title">
            {name && name.SITE_NAME
              ? name.SITE_NAME
              : "Community Park Playground"}
          </h3>

          <div className="community">
            <p className="address">
              <img src="/pin.svg" alt="" />
            </p>
            <p className="description">{name.COMMUNITY_NAME}</p>
          </div>
        </div>

        <div className="features">{renderEquipment(equipment).slice(0, 3)}</div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="buttonInfo"
          role="button"
        >
          More Info
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modalInfo">
          <h3>
            {name && name.SITE_NAME
              ? name.SITE_NAME
              : "Community Park Playground"}
          </h3>
          <div className="equipmentInfo">{renderEquipment(equipment)}</div>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <button className="buttonInfo">View on Google Maps</button>
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default Card;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Card.css";
// import Modal from "../../components/modal/Modal";

// const Card = (props) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const renderEquipment = (equipment) => {
//     return equipment?.equipment?.map((item, index) => (
//       <div key={index} className="playground">
//         <p className={`ageClass ${item.EQUIPMENT_AGE_CLASS ? "hasAge" : ""}`}>
//           {item.EQUIPMENT_AGE_CLASS}
//         </p>
//         <p className="descriptiontype">{item.TYPE_DESCRIPTION}</p>
//         {/* <p>{item.MAINT_INFO}</p> */}
//       </div>
//     ));
//   };

//   const { name, equipment, surface } = props;
//   const firstItemCoordinates = surface?.the_geom?.coordinates?.[0]?.[0];

//   // Check if firstItemCoordinates is defined and has the expected structure
//   let latitude, longitude, googleMapsUrl;
//   if (firstItemCoordinates && Array.isArray(firstItemCoordinates) && firstItemCoordinates.length >= 2) {
//     const latitude = firstItemCoordinates[0][1];
//     const longitude = firstItemCoordinates[0][0];
//     googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
//   } else {
//     // Handle the case where coordinates are not available
//     googleMapsUrl = "#"; // Default to a placeholder or error message
//   }

//   return (
//     <div className="card">
//       <div className="textContainer">
//         <div className="nameContainer">
//           <h3 className="title">
//             {name && name.SITE_NAME
//               ? name.SITE_NAME
//               : "Community Park Playground"}
//           </h3>

//           <div className="community">
//             <p className="address">
//               <img src="/pin.svg" alt="" />
//             </p>
//             <p className="description">{name.COMMUNITY_NAME}</p>
//           </div>
//         </div>

//         <div className="features">{renderEquipment(equipment).slice(0, 3)}</div>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="buttonInfo"
//           role="button"
//         >
//           More Info
//         </button>
//       </div>
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="modalInfo">
//           <h3>
//             {name && name.SITE_NAME
//               ? name.SITE_NAME
//               : "Community Park Playground"}
//           </h3>
//           <div className="equipmentInfo">{renderEquipment(equipment)}</div>
//           <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
//             <button className="buttonInfo">View on Google Maps</button>
//           </a>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Card;
