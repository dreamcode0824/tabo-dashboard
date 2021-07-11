import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Row } from "reactstrap";
import ImageUpload from "../../../../components/CustomUpload/ImageUpload.js";
import Loading from "../../../../assets/img/loading.gif";
import {
  getBusinessGallery,
  businessGalleries,
  imageDeleteActions,
  beachPhotoId,
} from "../../../../redux/option/action";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
const PhotoExtraSunbed = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [count, setCount] = useState(1);
  const [beachImageData, setBeachImageData] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [imageSaveStatus, setImageSaveStatus] = useState("create");
  const [updateId, setUpdateId] = useState(0);
  useEffect(() => {
    console.log("business");
    dispatch(getBusinessGallery());
  }, [business.filterBusinessList]);
  useEffect(() => {
    console.log("------------>businessgallery");
    let arr = [];
    if (option.businessGallery.length > 0) {
      option.businessGallery.map((item, index) => {
        arr.push({ file: "", previewUrl: item.url, id: item.id });
      });
      setBeachImageData([...arr]);
    } else {
      setBeachImageData([]);
    }
  }, [option.businessGallery]);
  const imageUpload = (file, previewUrl) => {
    setImageFile(file);
    setCount(count + 1);
    if (imageSaveStatus == "create") {
      setBeachImageData([
        ...beachImageData,
        { file: [file], previewUrl: [previewUrl], id: "i" + (count + 1) },
      ]);
    } else {
      let arr = [...beachImageData];
      arr.map((item, index) => {
        if (item.id == updateId) {
          arr[index]["previewUrl"] = Loading;
        }
      });
      setBeachImageData(arr);
    }
  };
  useEffect(() => {
    if (imageFile.name) {
      console.log(imageFile.name);
      const formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      formData.append("myImage", imageFile);
      formData.append("business_id", business.filterBusinessList.id);
      if (imageSaveStatus == "update") {
        formData.append("id", updateId);
        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/beach-photo/upload`,
            formData,
            config
          )
          .then((response) => {
            if (response) {
              if (response.data.length > 0) {
                setImageSaveStatus("create");
                dispatch(businessGalleries(response.data));
              }
            }
          })
          .catch((error) => { });
      }
      if (imageSaveStatus == "create") {
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/beach-photo/upload`,
            formData,
            config
          )
          .then((response) => {
            if (response) {
              if (response.data.length > 0) {
                dispatch(businessGalleries(response.data));
              }
            }
          })
          .catch((error) => { });
      }
    }
  }, [imageFile]);
  const imageDeleteAction = (id) => {
    const filterResult = beachImageData.filter((ele) => ele.id != id);
    if (filterResult.length > 0) {
      setBeachImageData(filterResult);
    }
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/beach-photo/upload`,
      data: {
        deleteId: `${id}`, // This is the body part
      },
    })
      .then((response) => {
        if (response) {
          dispatch(getBusinessGallery());
          console.log(response);
        }
      })
      .catch((error) => { });
  };
  const imageUpdateAction = (id) => {
    setImageSaveStatus("update");
    setUpdateId(id);
  };
  return (
    <React.Fragment>
      <Card className="card-user">
        <CardHeader className="px-4">
          <h5 className="title mb-0">{t(business.businessName)} {t("Photo")}</h5>
        </CardHeader>
        <CardBody className="px-4">
          <Row>
            {beachImageData.length > 0 && (
              <React.Fragment>
                {beachImageData.map((item, index) => {
                  return (
                    <div className="px-3" key={index}>
                      <ImageUpload
                        beachImageUpload={imageUpload}
                        imageUrl={item.previewUrl}
                        imageId={item.id}
                        imageDelete={imageDeleteAction}
                        imageUpdate={imageUpdateAction}
                      />
                    </div>
                  );
                })}
              </React.Fragment>
            )}
            {beachImageData.length < 15 && (
              <div className="px-3">
                <ImageUpload beachImageUpload={imageUpload} imageUrl={""} />
              </div>
            )}
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default PhotoExtraSunbed;
