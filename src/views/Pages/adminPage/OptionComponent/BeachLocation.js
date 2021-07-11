import React, { Fragment, useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { useDispatch, useSelector } from "react-redux";
import { saveBeachLocation } from "../../../../redux/option/action";
import { useTranslation } from "react-i18next";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
const RegularMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{
        lat: Number(props.latValue),
        lng: Number(props.lngValue),
      }}
      defaultOptions={{
        // scrollwheel: true,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
      }}
      center={{ lat: Number(props.latValue), lng: Number(props.lngValue) }}
    >
      <Marker
        position={{ lat: Number(props.latValue), lng: Number(props.lngValue) }}
        onDragEnd={(e) => {
          props.handleDragEnd(e);
        }}
        draggable={true}
      />
    </GoogleMap>
  ))
);
const PhotoExtraSunbed = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [mapPosition, setMapPosition] = useState({
    lat: 45.943161,
    lng: 24.966761,
  });
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (option.businessSettings.length > 0) {
      if (
        Number(option.businessSettings[0].latitude) == 0 &&
        Number(option.businessSettings[0].longitude) == 0
      ) {
        getGeolocation();
      } else {
        setMapPosition({
          lat: option.businessSettings[0].latitude,
          lng: option.businessSettings[0].longitude,
        });
      }
    } else {
      getGeolocation();
    }
  }, [option.businessSettings]);
  useEffect(() => {
    if (value) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${value.label}&key=AIzaSyDHsb5vqLqXP2n-CszQ8HO8czTlPw7Vhcw`
      ) // B
        .then((response) => response.json()) // C
        .then((result) => {
          setMapPosition(result.results[0].geometry.location);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [value]);
  const getGeolocation = () => {
    fetch("https://extreme-ip-lookup.com/json/")
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          setMapPosition({ lat: response.lat, lng: response.lon });
        }
      })
      .catch((data, status) => {
        console.log("Request failed:", data);
      });
  };
  const mapDragEnd = (event) => {
    setMapPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };
  const saveBeachLocationAction = (event) => {
    console.log(mapPosition);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapPosition.lat},${mapPosition.lng}&key=AIzaSyDHsb5vqLqXP2n-CszQ8HO8czTlPw7Vhcw`
    ) // B
      .then((response) => response.json()) // C
      .then((result) => {
        if (result) {
          let splitedLetter = result.results[0].formatted_address.split(",");
          var country = result.results[0].formatted_address
            .split(",")
          [splitedLetter.length - 1].replace(/[0-9]/g, "")
            .trim();
          var city = result.results[0].formatted_address
            .split(",")
          [splitedLetter.length - 2].replace(/[0-9]/g, "")
            .trim();
          dispatch(saveBeachLocation(mapPosition, country, city));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <React.Fragment>
      <Card className="card-user">
        <CardHeader className="px-4">
          {console.log("Check bussiness type", business.businessName)}
          <h5 className="title mb-0">{t(business.businessName)} {t("Location")}</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={4}>
              <div className="py-2">
                <GooglePlacesAutocomplete
                  apiKey="AIzaSyDHsb5vqLqXP2n-CszQ8HO8czTlPw7Vhcw"
                  selectProps={{
                    placeholder: `${t("Search_place")}`,
                    value,
                    onChange: setValue,
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={12}>
              <p className="light-gray bold mb-4">
                {t("Select_beach_location")}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={12}>
              <RegularMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDHsb5vqLqXP2n-CszQ8HO8czTlPw7Vhcw`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `480px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                latValue={mapPosition.lat}
                lngValue={mapPosition.lng}
                handleDragEnd={mapDragEnd}
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button color="primary" className="btn-round" onClick={saveBeachLocationAction}>
              {t("Save")}
            </Button>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default PhotoExtraSunbed;
