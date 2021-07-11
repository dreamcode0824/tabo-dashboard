import { ApolloClient, from, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const link = new HttpLink({
  uri: `${process.env.REACT_APP_API_URL}`,
});
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}
const authLink = setContext(async (_, { headers }) => {
  let token;
  let localState = localStorage.getItem("persist:business");
  if (localState && typeof JSON.parse(localState) === 'object') {
    localState = JSON.parse(localState);
    token = localState.accessToken
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      }
    };
  }
});
const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  defaultOptions
});
export default class API {
  getRuleRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
             query business_rules{
              business_rules(where:{
                business_id:${business.filterBusinessList.id}
              }){
                id
                rules
              }
            }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  saveRuleRequests(business, option) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_rulesCreate{
            business_rulesCreate(business_rules:{
              rules:{
                en:"${option.en}",
                ro:"${option.ro}",
                fr:"${option.fr}",
                es:"${option.es}", 
                it:"${option.it}",
                el:"${option.el}",
                enGoogleTranslated:"${option.enGoogleTranslated}",
                roGoogleTranslated:"${option.roGoogleTranslated}",
                frGoogleTranslated:"${option.frGoogleTranslated}",
                esGoogleTranslated:"${option.esGoogleTranslated}",
                itGoogleTranslated:"${option.itGoogleTranslated}",
                elGoogleTranslated:"${option.elGoogleTranslated}",
                mainLang:"${option.mainLang}",
                currentIng:"${option.currentIng}"
              }
              business_id:${business.filterBusinessList.id}
            }){
              id
              rules
              business_id
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  updateRuleRequests(business, option) {
    try {
      let data = client.mutate({
        mutation: gql`
             mutation business_rulesUpdate{
            business_rulesUpdate(business_rules:{
              id:${option.ruleId}
              rules:{
                en:"${option.en}",
                ro:"${option.ro}",
                fr:"${option.fr}",
                es:"${option.es}", 
                it:"${option.it}",
                el:"${option.el}",
                enGoogleTranslated:"${option.enGoogleTranslated}",
                roGoogleTranslated:"${option.roGoogleTranslated}",
                frGoogleTranslated:"${option.frGoogleTranslated}",
                esGoogleTranslated:"${option.esGoogleTranslated}",
                itGoogleTranslated:"${option.itGoogleTranslated}",
                elGoogleTranslated:"${option.elGoogleTranslated}",
                mainLang:"${option.mainLang}",
                currentIng:"${option.currentIng}"
              }
              business_id:${business.filterBusinessList.id}
            }){
              id
              rules
              business_id
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getFacilitiesActionRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
             query business_facilities{
              business_facilities(where:{
                business_id:${business.filterBusinessList.id}
              }){
                id
                facility_id
                business_id
              }
            }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  deleteFacilitiesActionRequests(id, business) {
    try {
      let data = client.mutate({
        mutation: gql`
             mutation business_facilitiesDelete{
                business_facilitiesDelete(id:${id})
              }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  createFacilitiesActionRequests(id, business) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_facilitiesCreate{
            business_facilitiesCreate(business_facilities:{
              facility_id:${id}
              business_id:${business.filterBusinessList.id}
            }){
              business_id
              facility_id
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getExtraSunbedPhotoActionRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
              query business_settings{
              business_settings(where:{
                business_id:${business.filterBusinessList.id}
              }){
               id
                latitude
                longitude
                photo_required
                extra_sunbeds
                business_id
                umbrella_requrired
                estimated_time
                booking_time_limit
                guaranteed_reservation
                money_selected
              }
            }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  createExtraSunbedPhotoActions(option, photoRequired, extraSunbed, umbrellarRequired, business) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsCreate{
            business_settingsCreate(business_settings:{
              photo_required:${photoRequired}
              extra_sunbeds:${extraSunbed}
              business_id:${business.filterBusinessList.id},
              umbrella_requrired:${umbrellarRequired}
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
              umbrella_requrired
               guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  updateExtraSunbedPhotoActions(option, photoRequired, extraSunbed, umbrellarRequired) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsUpdate{
            business_settingsUpdate(business_settings:{
              id:${option.businessSettings[0].id}
              photo_required:${photoRequired}
              extra_sunbeds:${extraSunbed}
              umbrella_requrired:${umbrellarRequired}
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
              umbrella_requrired
               guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getBeachLocationActionRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
              query business_settings{
              business_settings(where:{
                business_id:${business.filterBusinessList.id}
              }){
                id
                latitude
                longitude
                photo_required
                extra_sunbeds
                business_id
                estimated_time
                booking_time_limit
                guaranteed_reservation
                 guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
              }
            }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  createBeachLocationActions(option, mapPosition, business, country, city) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsCreate{
            business_settingsCreate(business_settings:{
              latitude:${mapPosition.lat}
              longitude:${mapPosition.lng}
              business_id:${business.filterBusinessList.id}
              beach_location_country:"${country}"
              beach_location_city:"${city}"
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
               guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  updateBeachLocationActions(option, mapPosition, country, city) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsUpdate{
            business_settingsUpdate(business_settings:{
              id:${option.businessSettings[0].id}
              latitude:${mapPosition.lat}
              longitude:${mapPosition.lng}
              beach_location_country:"${country}"
              beach_location_city:"${city}"
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
               guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getBusinessGalleryRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
                query business_gallery{
                business_gallery(where:{
                  business_id:${business.filterBusinessList.id}
                }){
                  id
                  url
                  is_main
                  business_id
                }
              }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  imageDeleteActionRequests(id, business) {
    try {
      let data = client.mutate({
        mutation: gql`
             mutation business_galleryDelete{
                business_galleryDelete(id:${id})
              }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  businessElementPhotoRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
                query business_element_gallery{
                business_element_gallery(where:{
                  business_id:${business.filterBusinessList.id}
                }){
                  id
                  image
                  element_type
                }
              }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getBusinessTypeRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
                query business_element{
                business_element(where:{
                  business_id:${business.filterBusinessList.id}
                }){
                  id
                  element{
                    id
                    type
                  }
                }
              }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  saveReservationGuarationRequests(value, business) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsCreate{
            business_settingsCreate(business_settings:{
              business_id:${business.filterBusinessList.id}
              guaranteed_reservation:${value}
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
              guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  updateReservationGuarationRequests(value, business, option) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsUpdate{
            business_settingsUpdate(business_settings:{
              id:${option.businessSettings[0].id}
              business_id:${business.filterBusinessList.id}
              guaranteed_reservation:${value}
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
              guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  saveEstimatedRequests(count, business) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsCreate{
            business_settingsCreate(business_settings:{
              business_id:${business.filterBusinessList.id}
              estimated_time:${count}
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
              guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  updateEstimatedRequests(count, business, option) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsUpdate{
            business_settingsUpdate(business_settings:{
              id:${option.businessSettings[0].id}
              business_id:${business.filterBusinessList.id}
              estimated_time:${count}
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
              guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  saveIntervalTimeRequests(count, business) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsCreate{
            business_settingsCreate(business_settings:{
              business_id:${business.filterBusinessList.id}
              booking_time_limit:${count}
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
              guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  updateIntervalTimeRequests(count, business, option) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsUpdate{
            business_settingsUpdate(business_settings:{
              id:${option.businessSettings[0].id}
              business_id:${business.filterBusinessList.id}
              booking_time_limit:${count}
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
              guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  saveMoneySelectRequests(name, business) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsCreate{
            business_settingsCreate(business_settings:{
              business_id:${business.filterBusinessList.id}
              money_selected:"${name}"
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
              guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  updateMoneySelectRequests(name, business, option) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_settingsUpdate{
            business_settingsUpdate(business_settings:{
              id:${option.businessSettings[0].id}
              business_id:${business.filterBusinessList.id}
              money_selected:"${name}"
            }){
              id
              latitude
              longitude
              photo_required
              extra_sunbeds
              business_id
              guaranteed_reservation
              estimated_time
              booking_time_limit
              money_selected
            }
          }
            `,
      })
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}