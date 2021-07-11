import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const LocationMenu = () => {
  const history = useHistory();
  const business = useSelector(({ business }) => business);
  const nextPage = () => {
    history.push(`/admin/business/${business.filterBusinessList.id ? business.filterBusinessList.id : business.businessLists[0].id}`)
  }
  return (
    <a
      onClick={nextPage}
      className="simple-text logo-normal cursor"
      target="_blank"
    >
      {business.businessName ? business.businessName : business.businessLists[0] ? business.businessLists[0].id : ""}
    </a>
  )
}
export default LocationMenu;
