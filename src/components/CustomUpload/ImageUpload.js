import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import { useTranslation } from 'react-i18next';
const ImageUpload = ({ avatar, beachImageUpload, imageUrl, imageId, imageDelete, imageUpdate }) => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    file: null,
    imagePreviewUrl: avatar ? defaultAvatar : defaultImage,
    imageId: ""
  })
  useEffect(() => {
    if (imageUrl) {
      setState({ ...state, imagePreviewUrl: imageUrl, id: imageId })
    } else {
      setState({ ...state, imagePreviewUrl: "", id: "" })
    }
  }, [imageUrl])
  const fileInput = React.createRef();
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setState({
        file: file,
        imagePreviewUrl: "",
        // imagePreviewUrl: reader.result,
      });
      beachImageUpload(file, reader.result)
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  };
  const handleClick = (id) => (event) => {
    fileInput.current.click();
    if (id == "selectImage") {
    } else {
      imageUpdate(id)
    }
  };
  const handleRemove = (id) => (event) => {
    imageDelete(id)
    // fileInput.current.value = null;
    // setState({
    //   file: null,
    //   imagePreviewUrl: avatar ? defaultAvatar : defaultImage,
    //   id: ""
    // });
  };
  return (
    <div className="fileinput text-center">
      <input
        type="file"
        onChange={handleImageChange}
        ref={fileInput}
      />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        {state.imagePreviewUrl ? (
          <img src={state.imagePreviewUrl} alt="..." width="200px" height="200px" />
        ) : (
            <img src={`/image_placeholder.jpg`} alt="..." width="200px" height="200px" />
          )}
      </div>
      <div>
        {state.imagePreviewUrl ? (
          <span>
            <Button className="btn-round" onClick={handleClick(state.id)}>
              {t("Change")}
            </Button>
            {avatar ? <br /> : null}
            <Button
              color="danger"
              className="btn-round"
              onClick={handleRemove(state.id)}
            >
              <i className="fa fa-times" />
              {t("Remove")}
            </Button>
          </span>
        ) : (
            <Button className="btn-round" onClick={handleClick("selectImage")}>
              {avatar ? "Add Photo" : `${t("Select image")}`}
            </Button>
          )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
};

export default ImageUpload;
