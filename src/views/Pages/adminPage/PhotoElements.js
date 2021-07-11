import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import PanelHeader from "../../../components/PanelHeader/PanelHeader"
import ImageUpload from "../../../components/CustomUpload/ImageUpload.js";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../assets/img/loading.gif";
import axios from 'axios';
import { getBusinessElementPhoto, businessElementGalleries, getBusinessType } from "../../../redux/option/action"
const Statistics = () => {
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [elementTypes, setElementsTypes] = useState([]);
  useEffect(() => {
    dispatch(getBusinessType())
  }, [])
  useEffect(() => {
    if (option.businessElementType.length > 0) {
      let arr = null;
      let elementType = [];
      let typeArr = [];
      option.businessElementType.map((item) => {
        typeArr.push(item.element.type)
      })
      typeArr.sort();
      console.log(typeArr)
      typeArr.map((list) => {
        if (arr != list) {
          arr = list;
          if (list === "umbrella") {
            elementType.push("sunbed")
          } else {
            elementType.push(list)

          }
        }
      })
      if (option.businessSettings[0].umbrella_requrired) {
        elementType.push("umbrella")
      }
      setElementsTypes(elementType)
    }
  }, [option.businessElementType])
  useEffect(() => {
    dispatch(getBusinessElementPhoto())
  }, [business.filterBusinessList.id])
  console.log(elementTypes, "lllllllllllllllll")
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        {elementTypes.length > 0 ? (
          <React.Fragment>
            {elementTypes.map((item, index) => {
              return (
                <PhotoElementTypeComponent
                  key={index}
                  item={item}
                />
              )
            })}
          </React.Fragment>
        ) : (
          <Row >
            <Col md="12" className="mx-auto">
              <Card className="card-user">
                <CardHeader className="px-4">
                  <h5 className="title mb-0">Business Element</h5>
                </CardHeader>
                <CardBody className="px-4">
                  <h5 className="title mb-0 text-center">There is no data to display.</h5>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  )
}
export default Statistics;


const PhotoElementTypeComponent = ({ item }) => {
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [count, setCount] = useState(1);
  const [beachImageData, setBeachImageData] = useState([]);
  const [imageFile, setImageFile] = useState([])
  const [imageSaveStatus, setImageSaveStatus] = useState("create")
  const [updateId, setUpdateId] = useState(0);
  useEffect(() => {
    let arr = [];
    if (option.businessElementPhoto.length > 0) {
      if (item == "umbrella") {
        option.businessElementPhoto.map((item) => {
          if (item.element_type == "sunbed") {
            arr.push({ file: "", previewUrl: item.image, id: item.id })
          }
        })
      } else {
        option.businessElementPhoto.map((item) => {
          if (item.element_type == "bed") {
            arr.push({ file: "", previewUrl: item.image, id: item.id })
          }
        })
      }
      setBeachImageData([...arr])
    } else {
      setBeachImageData([])
    }
  }, [option.businessElementPhoto])
  const imageUpload = (file, previewUrl) => {
    setImageFile(file)
    setCount(count + 1)
    if (imageSaveStatus == "create") {
      setBeachImageData([...beachImageData, { file: [file], previewUrl: [previewUrl], id: "i" + (count + 1) }])
    } else {
      let arr = [...beachImageData];
      arr.map((item, index) => {
        if (item.id == updateId) {
          arr[index]['previewUrl'] = Loading
        }
      })
      setBeachImageData(arr)
    }
  }
  useEffect(() => {
    if (imageFile.name) {
      console.log(imageFile.name)
      const formData = new FormData();
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      formData.append('myImage', imageFile);
      formData.append('business_id', business.filterBusinessList.id)
      if (item == "umbrella") {
        formData.append('element_type', "sunbed")
      } else {
        formData.append('element_type', "bed")
      }
      if (imageSaveStatus == "update") {
        formData.append('id', updateId)
        axios.put(`${process.env.REACT_APP_BASE_URL}/beach-element/upload`, formData, config)
          .then((response) => {
            if (response) {
              if (response.data.length > 0) {
                setImageSaveStatus("create")
                dispatch(businessElementGalleries(response.data))
              }
            }
          }).catch((error) => {
          });
      }
      if (imageSaveStatus == "create") {
        axios.post(`${process.env.REACT_APP_BASE_URL}/beach-element/upload`, formData, config)
          .then((response) => {
            if (response) {
              if (response.data.length > 0) {
                dispatch(businessElementGalleries(response.data))
              }
            }
          }).catch((error) => {
          });
      }
    }
  }, [imageFile])
  const imageDeleteAction = (id) => {
    const filterResult = beachImageData.filter(ele => ele.id != id);
    if (filterResult.length > 0) {
      setBeachImageData(filterResult)
    }
    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/beach-element/upload`,
      data: {
        deleteId: `${id}`, // This is the body part
      }
    }).then((response) => {
      if (response) {
        dispatch(getBusinessElementPhoto())
        console.log(response)
      }
    }).catch((error) => {
    });
  }
  const imageUpdateAction = (id) => {
    setImageSaveStatus("update")
    setUpdateId(id)
  }
  return (
    <Row >
      <Col md="12" className="mx-auto">
        <Card className="card-user">
          <CardHeader className="px-4">
            <h5 className="title mb-0" style={{ fontStyle: 'capitalize' }}>{item}</h5>
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
                    )
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
      </Col>
    </Row>
  )
}
export { PhotoElementTypeComponent };