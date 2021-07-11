import { put, all, call, takeLatest, delay, select } from "redux-saga/effects";
import { actionTypes } from "./action";
import API from './api';
const api = new API();

///////////////////
const getRuleRequest = (business) => {
  return api.getRuleRequests(business)
}
function* getRule() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getRuleRequest, business)
    if (result.data) {
      console.log(result.data.business_rules.length)
      if (result.data.business_rules.length > 0) {
        yield put({
          type: actionTypes.RESULT_GET_RULE,
          ruleId: result.data.business_rules[0].id,
          el: result.data.business_rules[0].rules.el,
          en: result.data.business_rules[0].rules.en,
          es: result.data.business_rules[0].rules.es,
          fr: result.data.business_rules[0].rules.fr,
          it: result.data.business_rules[0].rules.it,
          ro: result.data.business_rules[0].rules.ro,
          elGoogleTranslated: result.data.business_rules[0].rules.elGoogleTranslated,
          enGoogleTranslated: result.data.business_rules[0].rules.enGoogleTranslated,
          esGoogleTranslated: result.data.business_rules[0].rules.esGoogleTranslated,
          frGoogleTranslated: result.data.business_rules[0].rules.frGoogleTranslated,
          itGoogleTranslated: result.data.business_rules[0].rules.itGoogleTranslated,
          roGoogleTranslated: result.data.business_rules[0].rules.roGoogleTranslated,
          mainLang: result.data.business_rules[0].rules.mainLang,
          currentIng: result.data.business_rules[0].rules.currentIng,
        })
      } else {
        yield put({
          type: actionTypes.RESULT_GET_RULE,
          ruleId: "",
          el: "",
          en: "",
          es: "",
          fr: "",
          it: "",
          ro: "",
          elGoogleTranslated: 'false',
          enGoogleTranslated: 'false',
          esGoogleTranslated: 'false',
          frGoogleTranslated: 'false',
          itGoogleTranslated: 'false',
          roGoogleTranslated: 'false',
          mainLang: "",
          currentIng: "en",
        })
      }
      console.log(result.data.business_rules)
    }
  } catch (e) {
    console.log(e)
  }
}
const saveRuleRequest = (business, option) => {
  return api.saveRuleRequests(business, option)
}
const updateRuleRequest = (business, option) => {
  return api.updateRuleRequests(business, option)
}
function* saveRule() {
  try {
    const business = yield select((store) => store.business);
    const option = yield select((store) => store.option);
    if (option.ruleId) {
      const result = yield call(updateRuleRequest, business, option)
      if (result.data) {
        if (result.data.business_rulesUpdate) {
          yield put({
            type: actionTypes.RESULT_GET_RULE,
            ruleId: result.data.business_rulesUpdate.id,
            el: result.data.business_rulesUpdate.rules.el,
            en: result.data.business_rulesUpdate.rules.en,
            es: result.data.business_rulesUpdate.rules.es,
            fr: result.data.business_rulesUpdate.rules.fr,
            it: result.data.business_rulesUpdate.rules.it,
            ro: result.data.business_rulesUpdate.rules.ro,
            elGoogleTranslated: result.data.business_rulesUpdate.rules.elGoogleTranslated,
            enGoogleTranslated: result.data.business_rulesUpdate.rules.enGoogleTranslated,
            esGoogleTranslated: result.data.business_rulesUpdate.rules.esGoogleTranslated,
            frGoogleTranslated: result.data.business_rulesUpdate.rules.frGoogleTranslated,
            itGoogleTranslated: result.data.business_rulesUpdate.rules.itGoogleTranslated,
            roGoogleTranslated: result.data.business_rulesUpdate.rules.roGoogleTranslated,
            mainLang: result.data.business_rulesUpdate.rules.mainLang,
            currentIng: result.data.business_rulesUpdate.rules.currentIng,
          })
        }
      }
    } else {
      const result = yield call(saveRuleRequest, business, option)
      if (result.data) {
        if (result.data.business_rulesCreate) {
          yield put({
            type: actionTypes.RESULT_GET_RULE,
            ruleId: result.data.business_rulesCreate.id,
            el: result.data.business_rulesCreate.rules.el,
            en: result.data.business_rulesCreate.rules.en,
            es: result.data.business_rulesCreate.rules.es,
            fr: result.data.business_rulesCreate.rules.fr,
            it: result.data.business_rulesCreate.rules.it,
            ro: result.data.business_rulesCreate.rules.ro,
            elGoogleTranslated: result.data.business_rulesCreate.rules.elGoogleTranslated,
            enGoogleTranslated: result.data.business_rulesCreate.rules.enGoogleTranslated,
            esGoogleTranslated: result.data.business_rulesCreate.rules.esGoogleTranslated,
            frGoogleTranslated: result.data.business_rulesCreate.rules.frGoogleTranslated,
            itGoogleTranslated: result.data.business_rulesCreate.rules.itGoogleTranslated,
            roGoogleTranslated: result.data.business_rulesCreate.rules.roGoogleTranslated,
            mainLang: result.data.business_rulesCreate.rules.mainLang,
            currentIng: result.data.business_rulesCreate.rules.currentIng,
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const getFacilitiesActionRequest = (business) => {
  return api.getFacilitiesActionRequests(business)
}
function* getFacilitiesAction() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getFacilitiesActionRequest, business)
    if (result.data) {
      if (result.data.business_facilities.length > 0) {
        yield put({
          type: actionTypes.RESULT_GET_FACILITIES,
          value: result.data.business_facilities,
        })
      } else {
        yield put({
          type: actionTypes.RESULT_GET_FACILITIES,
          value: [],
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const createFacilitiesActionRequest = (id, business) => {
  return api.createFacilitiesActionRequests(id, business)
}
function* createFacilitiesAction({ id }) {
  try {
    const business = yield select((store) => store.business);
    const result1 = yield call(createFacilitiesActionRequest, id, business)
    if (result1.data) {
      const business = yield select((store) => store.business);
      const result = yield call(getFacilitiesActionRequest, business)
      if (result.data) {
        if (result.data.business_facilities.length > 0) {
          yield put({
            type: actionTypes.RESULT_GET_FACILITIES,
            value: result.data.business_facilities,
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const deleteFacilitiesActionRequest = (id, business) => {
  return api.deleteFacilitiesActionRequests(id, business)
}
function* deleteFacilitiesAction({ id }) {
  console.log(id)
  try {
    const business = yield select((store) => store.business);
    const result1 = yield call(deleteFacilitiesActionRequest, id, business)
    if (result1.data) {
      const business = yield select((store) => store.business);
      const result = yield call(getFacilitiesActionRequest, business)
      if (result.data) {
        if (result.data.business_facilities.length > 0) {
          yield put({
            type: actionTypes.RESULT_GET_FACILITIES,
            value: result.data.business_facilities,
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const getExtraSunbedPhotoActionRequest = (business) => {
  return api.getExtraSunbedPhotoActionRequests(business)
}
function* getExtraSunbedPhotoAction() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getExtraSunbedPhotoActionRequest, business)
    console.log(result)
    if (result.data) {
      if (result.data.business_settings.length > 0) {
        yield put({
          type: actionTypes.RESULT_GET_SETTING,
          value: result.data.business_settings,
        })
      } else {
        yield put({
          type: actionTypes.RESULT_GET_SETTING,
          value: [],
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const createExtraSunbedPhotoAction = (option, photoRequired, extraSunbed, umbrellarRequired, business) => {
  return api.createExtraSunbedPhotoActions(option, photoRequired, extraSunbed, umbrellarRequired, business)
}
const updateExtraSunbedPhotoAction = (option, photoRequired, extraSunbed, umbrellarRequired,) => {
  return api.updateExtraSunbedPhotoActions(option, photoRequired, extraSunbed, umbrellarRequired)
}
function* saveExtraSunbedPhotoAction({ photoRequired, extraSunbed, umbrellarRequired }) {
  try {
    const option = yield select((store) => store.option);
    const business = yield select((store) => store.business);
    if (option.businessSettings.length > 0) {
      const result = yield call(updateExtraSunbedPhotoAction, option, photoRequired, extraSunbed, umbrellarRequired)
    } else {
      const result = yield call(createExtraSunbedPhotoAction, option, photoRequired, extraSunbed, umbrellarRequired, business)
    }
  } catch (e) {
    console.log(e)
  }
}
const getBeachLocationActionRequest = (business) => {
  return api.getBeachLocationActionRequests(business)
}
function* getBeachLocationAction() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getBeachLocationActionRequest, business)
    if (result.data) {
      if (result.data.business_settings.length > 0) {
        yield put({
          type: actionTypes.RESULT_GET_SETTING,
          value: result.data.business_settings,
        })
      } else {
        yield put({
          type: actionTypes.RESULT_GET_SETTING,
          value: [],
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const createBeachLocationAction = (option, mapPosition, business, country, city) => {
  return api.createBeachLocationActions(option, mapPosition, business, country, city)
}
const updateBeachLocationAction = (option, mapPosition, country, city) => {
  return api.updateBeachLocationActions(option, mapPosition, country, city)
}
function* saveBeachLocationAction({ mapPosition, country, city }) {
  try {
    const option = yield select((store) => store.option);
    const business = yield select((store) => store.business);
    if (option.businessSettings.length > 0) {
      const result = yield call(updateBeachLocationAction, option, mapPosition, country, city)
    } else {
      const result = yield call(createBeachLocationAction, option, mapPosition, business, country, city)
    }
  } catch (e) {
    console.log(e)
  }
}
const getBusinessGalleryRequest = (business) => {
  return api.getBusinessGalleryRequests(business)
}
function* getBusinessGallery() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getBusinessGalleryRequest, business)
    if (result.data) {
      if (result.data.business_gallery.length > 0) {
        yield put({
          type: actionTypes.RESULT_GET_BUSINESS_GALLERY,
          value: result.data.business_gallery,
        })
      } else {
        yield put({
          type: actionTypes.RESULT_GET_BUSINESS_GALLERY,
          value: [],
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const imageDeleteActionRequest = (id, business) => {
  return api.imageDeleteActionRequests(id, business)
}
function* imageDeleteAction({ id }) {
  console.log(id)
  try {
    const business = yield select((store) => store.business);
    const result1 = yield call(imageDeleteActionRequest, id, business)
    if (result1.data) {
      const business = yield select((store) => store.business);
      const result = yield call(getBusinessGalleryRequest, business)
      if (result.data) {
        if (result.data.business_gallery.length > 0) {
          yield put({
            type: actionTypes.RESULT_GET_BUSINESS_GALLERY,
            value: result.data.business_gallery,
          })
        }
        else {
          yield put({
            type: actionTypes.RESULT_GET_BUSINESS_GALLERY,
            value: [],
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const businessElementPhotoRequest = (business) => {
  return api.businessElementPhotoRequests(business)
}
function* businessElementPhoto() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(businessElementPhotoRequest, business)
    if (result.data) {
      if (result.data.business_element_gallery.length > 0) {
        yield put({
          type: actionTypes.RESULT_GET_BUSINESS_ELEMENT_PHOTO,
          value: result.data.business_element_gallery,
        })
      } else {
        yield put({
          type: actionTypes.RESULT_GET_BUSINESS_ELEMENT_PHOTO,
          value: [],
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const getBusinessTypeRequest = (business) => {
  return api.getBusinessTypeRequests(business)
}
function* getBusinessType() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getBusinessTypeRequest, business)
    if (result.data) {
      if (result.data.business_element.length > 0) {
        yield put({
          type: actionTypes.GET_BUSINESS_ELEMENT_TYPE,
          value: result.data.business_element,
        })
      } else {
        yield put({
          type: actionTypes.GET_BUSINESS_ELEMENT_TYPE,
          value: [],
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const saveReservationGuarationRequest = (value, business) => {
  return api.saveReservationGuarationRequests(value, business)
}
const updateReservationGuarationRequest = (value, business, option) => {
  return api.updateReservationGuarationRequests(value, business, option)
}
function* saveReservationGuaration({ value }) {
  try {
    const option = yield select((store) => store.option);
    const business = yield select((store) => store.business);
    if (option.businessSettings.length > 0) {
      const result = yield call(updateReservationGuarationRequest, value, business, option)
    } else {
      const result = yield call(saveReservationGuarationRequest, value, business)
    }
  } catch (e) {
    console.log(e)
  }
}

const saveEstimatedRequest = (count, business) => {
  return api.saveEstimatedRequests(count, business)
}
const updateEstimatedRequest = (count, business, option) => {
  return api.updateEstimatedRequests(count, business, option)
}
function* saveEstimatedSaga({ count }) {
  try {
    const option = yield select((store) => store.option);
    const business = yield select((store) => store.business);
    if (option.businessSettings.length > 0) {
      const result = yield call(updateEstimatedRequest, count, business, option)
    } else {
      const result = yield call(saveEstimatedRequest, count, business)
    }
  } catch (e) {
    console.log(e)
  }
}
const saveIntervalTimeRequest = (count, business) => {
  return api.saveIntervalTimeRequests(count, business)
}
const updateIntervalTimeRequest = (count, business, option) => {
  return api.updateIntervalTimeRequests(count, business, option)
}
function* saveIntervalTimeSaga({ count }) {
  try {
    const option = yield select((store) => store.option);
    const business = yield select((store) => store.business);
    if (option.businessSettings.length > 0) {
      const result = yield call(updateIntervalTimeRequest, count, business, option)
    } else {
      const result = yield call(saveIntervalTimeRequest, count, business)
    }
  } catch (e) {
    console.log(e)
  }
}
const saveMoneySelectRequest = (name, business) => {
  return api.saveMoneySelectRequests(name, business)
}
const updateMoneySelectRequest = (name, business, option) => {
  return api.updateMoneySelectRequests(name, business, option)
}
function* saveMoneySelectSaga({ name }) {
  try {
    const option = yield select((store) => store.option);
    const business = yield select((store) => store.business);
    if (option.businessSettings.length > 0) {
      const result = yield call(updateMoneySelectRequest, name, business, option)
    } else {
      const result = yield call(saveMoneySelectRequest, name, business)
    }
  } catch (e) {
    console.log(e)
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_RULE, getRule),
    takeLatest(actionTypes.SAVE_RULE, saveRule),
    takeLatest(actionTypes.GET_FACILITIES, getFacilitiesAction),
    takeLatest(actionTypes.CREATE_FACILITIES, createFacilitiesAction),
    takeLatest(actionTypes.DELETE_FACILITIES, deleteFacilitiesAction),
    takeLatest(actionTypes.GET_EXTRA_SUNBED_PHOTO, getExtraSunbedPhotoAction),
    takeLatest(actionTypes.SAVE_EXTRA_SUNBED_PHOTO, saveExtraSunbedPhotoAction),
    takeLatest(actionTypes.GET_BEACH_LOCATION, getBeachLocationAction),
    takeLatest(actionTypes.SAVE_BEACH_LOCATION, saveBeachLocationAction),
    takeLatest(actionTypes.GET_BUSINESS_GALLERY, getBusinessGallery),
    takeLatest(actionTypes.IMAGE_DELETE_ACTION, imageDeleteAction),
    takeLatest(actionTypes.BUSINESS_ELEMENT_PHOTO, businessElementPhoto),
    takeLatest(actionTypes.GET_BUSINESS_TYPE, getBusinessType),
    takeLatest(actionTypes.SAVE_RESERVATION_GRARANTEED, saveReservationGuaration),
    takeLatest(actionTypes.SAVE_ESTIMATED_TIME, saveEstimatedSaga),
    takeLatest(actionTypes.SAVE_INTERVAL_TIME, saveIntervalTimeSaga),
    takeLatest(actionTypes.SAVE_MONEY_SELECT, saveMoneySelectSaga)
  ]);
}
