import { actionTypes } from "./action";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export const initState = {
  initials: null,
  ruleId: "",
  en: "",
  ro: "",
  fr: "",
  es: "",
  it: "",
  el: "",
  enGoogleTranslated: 'false',
  esGoogleTranslated: 'false',
  elGoogleTranslated: 'false',
  roGoogleTranslated: 'false',
  frGoogleTranslated: 'false',
  itGoogleTranslated: 'false',
  mainLang: "",
  currentIng: "en",
  facilities: [],
  businessSettings: [],
  businessGallery: [],
  businessElementPhoto: [],
  beachPhotoId: "",
  businessElementType: [],
};

export const reducer = persistReducer(
  {
    storage,
    key: "option",
    // whitelist: [
    //   'allElement',
    // ],
  },
  (state = initState, action) => {
    switch (action.type) {
      case actionTypes.INITIAL_STATE:
        return { ...state };
      case actionTypes.RESULT_GET_RULE:
        return {
          ...state,
          ruleId: action.ruleId,
          en: action.en,
          ro: action.ro,
          fr: action.fr,
          es: action.es,
          it: action.it,
          el: action.el,
          enGoogleTranslated: action.enGoogleTranslated,
          roGoogleTranslated: action.roGoogleTranslated,
          frGoogleTranslated: action.frGoogleTranslated,
          esGoogleTranslated: action.esGoogleTranslated,
          itGoogleTranslated: action.itGoogleTranslated,
          elGoogleTranslated: action.elGoogleTranslated,
          mainLang: action.mainLang,
          currentIng: action.currentIng
        };
      case actionTypes.SAVE_RULE:
        return {
          ...state,
          currentIng: action.lng,
          [action.lng]: action.translatedText
        }
      case actionTypes.CHANGE_RULE_VALUE:
        return {
          ...state,
          [action.currentIng]: action.ruleValue
        }
      case actionTypes.LANGUAGE_FLAG_STATUS:
        return {
          ...state,
          currentIng: action.currentIngFlag
        }
      case actionTypes.RESULT_GET_FACILITIES:
        return {
          ...state,
          facilities: action.value,
        }
      case actionTypes.RESULT_GET_FACILITIES:
        return {
          ...state,
          facilities: action.value,
        }
      case actionTypes.RESULT_GET_SETTING:
        return {
          ...state,
          businessSettings: action.value,
        }
      case actionTypes.CHAGNE_LANGUAGE_LIST:
        return {
          ...state,
          currentIng: action.value,
        }
      case actionTypes.TRANSLATED_LANGUAGE:
        return {
          ...state,
          [action.language]: action.status,
        }
      case actionTypes.SAVE_MAIN_LANGUAGE:
        return {
          ...state,
          mainLang: action.value,
        }
      case actionTypes.RESULT_GET_BUSINESS_GALLERY:
        return {
          ...state,
          businessGallery: action.value,
        }
      case actionTypes.BUSINESS_GALLERIES:
        return {
          ...state,
          businessGallery: action.value,
        }
      case actionTypes.BEACH_PHOTO_ID:
        return {
          ...state,
          beachPhotoId: action.id,
        }
      case actionTypes.RESULT_GET_BUSINESS_ELEMENT_PHOTO:
        return {
          ...state,
          businessElementPhoto: action.value,
        }
      case actionTypes.BUSINESS_ELEMENT_GALLERIES:
        return {
          ...state,
          businessElementPhoto: action.value,
        }
      case actionTypes.GET_BUSINESS_ELEMENT_TYPE:
        return {
          ...state,
          businessElementType: action.value,
        }
      default:
        return state;
    }
  }
)
