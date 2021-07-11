import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  FormGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import style from '../../../../assets/scss/additional/dropDownItem.module.scss'
import { googleTranslate } from "../OptionComponent/googleTranslate";
import { useDispatch, useSelector } from "react-redux";
import { getRule, saveRuleValue, changeRuleValue, translatedLanguage, changeLaguageList, saveMainLanguage, languageFlagStatus } from "../../../../redux/option/action";
const Rules = () => {
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [state, setState] = useState({
    modalDemo: false,
    modalDemoRule: false
  });
  const { t } = useTranslation();
  const [initialLanguageFlag, setInitialLanguageFlag] = useState("en")
  const [languageStatus, setLanguageStatus] = useState("en")
  const [ruleValue, setRuleValue] = useState("")
  const [savedStatus, setSavedStatus] = useState(true);
  const [allowTranslateStatus, setAllowTranslateStatus] = useState(false)
  const [isTranslated, setIsTranslated] = useState(false)
  const [saveLockStatus, setSaveLockStatus] = useState(true)
  useEffect(() => {
    dispatch(getRule())
  }, [business.filterBusinessList])
  useEffect(() => {
    setSavedStatus(true)
    setSaveLockStatus(true)
    setLanguageStatus(option.currentIng)
    setAllowTranslateStatus(option.mainLang ? true : false)
    setRuleValue(option.currentIng == "en" ? option.en : option.currentIng == "el" ? option.el : option.currentIng == "es" ? option.es : option.currentIng == "it" ? option.it : option.currentIng == "fr" ? option.fr : option.ro)
  }, [option.currentIng])
  const selectedLangValue = (selectedLang) => {
    if (selectedLang == "en") {
      return option.en
    }
    if (selectedLang == "es") {
      return option.es
    }
    if (selectedLang == "el") {
      return option.el
    }
    if (selectedLang == "fr") {
      return option.fr
    }
    if (selectedLang == "ro") {
      return option.ro
    }
    if (selectedLang == "it") {
      return option.it
    }
  }
  const translatedLanguages = (selectedLang) => {
    if (selectedLang == "en") {
      return "enGoogleTranslated"
    }
    if (selectedLang == "es") {
      return "esGoogleTranslated"
    }
    if (selectedLang == "el") {
      return "elGoogleTranslated"
    }
    if (selectedLang == "fr") {
      return "frGoogleTranslated"
    }
    if (selectedLang == "ro") {
      return "roGoogleTranslated"
    }
    if (selectedLang == "it") {
      return "itGoogleTranslated"
    }
  }
  const changeLanguage = (lng) => (event) => {
    setInitialLanguageFlag(lng)
    setSaveLockStatus(false)
    if (option.en.length == 0 && option.es.length == 0 && option.el.length == 0 && option.it.length == 0 && option.ro.length == 0 && option.fr.length == 0 && ruleValue.length == 0) {
      setLanguageStatus(lng)
      dispatch(languageFlagStatus(lng))
    } else {
      if (savedStatus) {
        if (option.mainLang == lng) {
          setLanguageStatus(lng)
          dispatch(languageFlagStatus(lng))
        } else {
          if (allowTranslateStatus) {
            setState({ ...state, modalDemo: true })
            setLanguageStatus(lng)
            dispatch(languageFlagStatus(lng))
          }
        }
      } else {
        setState({ ...state, modalDemoRule: true })
      }
    }
  };
  const translateAction = (event) => {
    googleTranslate.translate(selectedLangValue(option.mainLang), languageStatus, function (err, translation) {
      setRuleValue(translation.translatedText)
      setIsTranslated(true)
      setSaveLockStatus(false)
    });
  }
  const toggleModalDemo = () => {
    setState({ ...state, modalDemo: !state.modalDemo });
  }
  const toggleModalDemoRule = () => {
    setState({ ...state, modalDemoRule: !state.modalDemoRule });
  }
  const handleChangeRule = (event) => {
    setIsTranslated(false)
    const selectedResult = selectedLangValue(languageStatus)
    if (selectedResult == event.target.value) {
      setSavedStatus(true)
      setSaveLockStatus(true)
    } else {
      setSaveLockStatus(false)
      setSavedStatus(false)
    }
    setRuleValue(event.target.value)
  }
  const cancelLangAction = () => {
    setState({ ...state, modalDemoRule: !state.modalDemoRule })
    setSavedStatus(true)
    dispatch(languageFlagStatus(initialLanguageFlag))
  }
  const saveLangAction = () => {
    if (isTranslated) {
      const result = translatedLanguages(languageStatus)
      dispatch(translatedLanguage(result, "true"))
      setIsTranslated(false)
    } else {
      const result = translatedLanguages(languageStatus)
      dispatch(translatedLanguage(result, "false"))
    }
    if (option.mainLang.length == 0) {
      dispatch(saveMainLanguage(languageStatus))
    }
    dispatch(saveRuleValue(languageStatus, ruleValue))
    setSavedStatus(true)
    setState({ ...state, modalDemoRule: !state.modalDemoRule })
    setAllowTranslateStatus(true)
    setSaveLockStatus(true)
    // setTimeout(() => {
    //   dispatch(languageFlagStatus(initialLanguageFlag))
    // }, 300)
  }
  const allowTranslateAction = () => {
    translateAction()
    setSavedStatus(false)
    setState({ ...state, modalDemo: !state.modalDemo })
  }
  const unAllowTranslateAction = () => {
    setState({ ...state, modalDemo: !state.modalDemo })
  }
  const saveRuleAction = () => {
    if (isTranslated) {
      const result = translatedLanguages(languageStatus)
      dispatch(translatedLanguage(result, "true"))
      setIsTranslated(false)
    } else {
      const result = translatedLanguages(languageStatus)
      dispatch(translatedLanguage(result, "false"))
    }
    if (option.mainLang.length == 0) {
      dispatch(saveMainLanguage(languageStatus))
    }
    dispatch(saveRuleValue(languageStatus, ruleValue))
    setSavedStatus(true)
    setAllowTranslateStatus(true)
    setSaveLockStatus(true)
  }
  return (
    <React.Fragment>
      <Card className="options">
        <CardHeader className="px-4">
          <h5 className="title mb-0">{t("Rules")}</h5>
        </CardHeader>
        <CardBody className="px-4">
          <Row>
            <Col xs={12} md={6} sm={3} lg={4}>
              <div className="d-flex language-dropdown">
                <p className="light-gray bold mb-0 pt-3 mt-1 px-3">{t("Language")}:</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    color="secondary"
                    caret
                  >
                    <img src={`/language/${languageStatus}.png`} />
                  </DropdownToggle>
                  <DropdownMenu className={classNames(style.iconMenu)}>
                    {flagArray.data.map((list, index) => {
                      return (
                        <React.Fragment key={index}>
                          {list.name != languageStatus && (
                            <DropdownItem tag="a" className="cursor" onClick={changeLanguage(`${list.name}`)}><img src={`/language/${list.name}.png`} /></DropdownItem>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </Col>
          </Row>
          {(languageStatus == "en" && option.enGoogleTranslated == "true") && (
            <p className="text-info bold mb-0 pt-3 mt-1 px-3">{t("Text translated by google translate")}</p>
          )}
          {(languageStatus == "es" && option.esGoogleTranslated == "true") && (
            <p className="text-info bold mb-0 pt-3 mt-1 px-3">{t("Text translated by google translate")}</p>
          )}
          {(languageStatus == "el" && option.elGoogleTranslated == "true") && (
            <p className="text-info bold mb-0 pt-3 mt-1 px-3">{t("Text translated by google translate")}</p>
          )}
          {(languageStatus == "it" && option.itGoogleTranslated == "true") && (
            <p className="text-info bold mb-0 pt-3 mt-1 px-3">{t("Text translated by google translate")}</p>
          )}
          {(languageStatus == "fr" && option.frGoogleTranslated == "true") && (
            <p className="text-info bold mb-0 pt-3 mt-1 px-3">{t("Text translated by google translate")}</p>
          )}
          {(languageStatus == "ro" && option.roGoogleTranslated == "true") && (
            <p className="text-info bold mb-0 pt-3 mt-1 px-3">{t("Text translated by google translate")}</p>
          )}
          <Row>
            <Col xs={12} sm={12} md={12}>
              <FormGroup>
                <Input
                  cols="80"
                  placeholder="Please write Here"
                  rows="10"
                  type="textarea"
                  name="rule"
                  value={ruleValue}
                  onChange={handleChangeRule}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <div className="d-flex justify-content-end">
                <Button color="primary rule-button" className="btn-round" disabled={saveLockStatus} onClick={saveRuleAction}>{t("Save")}</Button>
              </div>
            </Col>
          </Row>
          <Modal isOpen={state.modalDemo} toggle={toggleModalDemo}>
            <ModalBody>
              <h5 className="title text-center">
                {`Do you like to translate the text from ${option.mainLang === "en" ? "English" : option.mainLang === "es" ? "Spanish" : option.mainLang === "el" ? "Greek" : option.mainLang === "it" ? "Italian" : option.mainLang === "fr" ? "French" : "Romanian"}`}
              </h5>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={allowTranslateAction}>
                {t("Yes")}
              </Button>
              <Button color="danger" onClick={unAllowTranslateAction}>
                {t("No")}
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={state.modalDemoRule} toggle={toggleModalDemoRule}>
            <ModalBody>
              <h5 className="title text-center">
                {`Text in ${languageStatus === "en" ? "English" : languageStatus === "es" ? "Spanish" : languageStatus === "el" ? "Greek" : languageStatus === "it" ? "Italian" : languageStatus === "fr" ? "French" : "Romanian"} was not saved. Do u want to save it ?`}
              </h5>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={saveLangAction} >
                {t("Yes")}
              </Button>
              <Button color="danger" onClick={cancelLangAction}>
                {t("No")}
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default Rules
const flagArray = {
  data: [
    {
      name: "en"
    },
    {
      name: "ro"
    },
    {
      name: "fr"
    },
    {
      name: "es"
    },
    {
      name: "it"
    },
    {
      name: "el"
    }
  ]
}