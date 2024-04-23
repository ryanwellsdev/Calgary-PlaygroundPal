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
  const { name, equipment } = props;

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
        </div>
      </Modal>
    </div>
  );
};

export default Card;
