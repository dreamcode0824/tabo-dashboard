import { put, all, call, takeLatest, select } from "redux-saga/effects";
import { ApolloClient, from, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useDispatch, useSelector } from "react-redux";
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
  loginRequests(value) {
    try {
      let data = client.mutate({
        mutation: gql`
                mutation login{
                  LoginClient(input: {email:"${value.email}" 
                  password:"${value.password}"}){    
                  token
                  result{
                    id
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
  getCounryRequests() {
    try {
      let data = client.mutate({
        mutation: gql`
                query countries{
                country(where:{}){
                  id
                  name
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
  existBusinessRequests(value) {
    try {
      let data = client.mutate({
        mutation: gql`
                query businessCount{
                businessCount(where: {
                  client_id:"${value}"
                })
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
  registerRequests(value) {
    console.log(value)
    try {
      let data = client.mutate({
        mutation: gql`
                mutation register{
                RegisterClient(input: {
                  first_name:"${value.firstName}"
                  last_name:"${value.lastName}"
                  email:"${value.email}" 
                  phone:"${value.phoneNumber}"
                  country_id:${value.country}
                  position:"${value.position}"
                }){
                  id
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
  businessTypesRequests(value) {
    // console.log(value)
    try {
      let data = client.mutate({
        mutation: gql`
                mutation saveBusinessTypes{
                SaveBusinessTypes(input: {beach:${value.businessType.beach}
                  pool:${value.businessType.pool}
                  restaurant:${value.businessType.restaurant}  
                  terrace:${value.businessType.terrace}
                  club:${value.businessType.club}
                  client_id:${value.userId}
                }){    
                  businesses{
                    id,
                    number,
                    name,
                    image,
                    description,
                    status,
                    type
                    representative_first_name,
                    representative_last_name,
                    representative_birth_date,
                    representative_phone,
                    representative_email,
                    zipcode,
                    address,
                    reg_com_number,
                    capital_social,
                    bank_name,
                    bank_account,
                    bank_routing_number,
                    bank_account_holder_name,
                    vat,
                    vat_number,
                    cui_number,
                    id_card_file_name,
                    identification_file_name,
                    additional_document_file_name,
                    country_id
                    city_id
                    location_name
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
  getBusinessTypeDataRequests(value) {
    try {
      let data = client.mutate({
        mutation: gql`
                  query businesslIST{
                  business(where: {
                    client_id:${value.userId}
                  }
                  order:"location_name"
                  )
                  {
                  	id,
                    number,
                    name,
                    image,
                    description,
                    status,
                    type
                    representative_first_name,
                    representative_last_name,
                    representative_birth_date,
                    representative_phone,
                    representative_email,
                    zipcode,
                    address,
                    reg_com_number,
                    capital_social,
                    bank_name,
                    bank_account,
                    bank_routing_number,
                    bank_account_holder_name,
                    vat,
                    vat_number,
                    cui_number,
                    id_card_file_name,
                    identification_file_name,
                    additional_document_file_name,
                    country_id
                    city_id
                    country{
                      name
                    }
                    city{
                      name
                    }
                    currency
                    location_name
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
  createBusinessActionRequests(value) {
    console.log(value)
    try {
      let data = client.mutate({
        mutation: gql`
              mutation businessUpdate{
              businessUpdate(business:{
              id:${value.id}
              name:"${value.value.name}"
              location_name:"${value.value.location_name}"
              description:"${value.value.description}"
              representative_first_name:"${value.value.representative_first_name}"
              representative_last_name:"${value.value.representative_last_name}"
              representative_phone:"${value.value.representative_phone}"
              representative_email:"${value.value.representative_email}"
              zipcode:"${value.value.zipcode}"
              address:"${value.value.address}"
              reg_com_number:"${value.value.reg_com_number}"
              capital_social:"${value.value.capital_social}"
              cui_number:"${value.value.cui_number}"
              vat:${value.value.vat}
              vat_number:"${value.value.vat_number}"
              bank_name:"${value.value.bank_name}"
              bank_account:"${value.value.bank_account}"
              bank_routing_number:"${value.value.bank_routing_number}"
              bank_account_holder_name:"${value.value.bank_account_holder_name}",
              city_id:${value.value.city_id}
              currency:"${value.value.currency}"
              country_id:${value.value.country_id}
              
            })
              {    
                id
                type,
                name,
                description,
                representative_first_name,
                representative_last_name,
                representative_birth_date,
                representative_phone,
                representative_email,
                zipcode,
                address,
                city_id,
                reg_com_number,
                capital_social,
                cui_number,
                vat,
                vat_number,
                bank_name,
                bank_account,
                bank_routing_number,
                bank_account_holder_name
                city_id
                country_id
                currency
                location_name
                representative_birth_date
                country{
                  name
                }
                city{
                  name
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
  getCityListActionRequests(value) {
    try {
      let data = client.mutate({
        mutation: gql`
                query getCityList{
                city(
                where:{country_id:${value.value}})
                {
                  id
                  name
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
  savePlanActionsRequests(value) {
    console.log(value)
    try {
      let data = client.mutate({
        mutation: gql`
                mutation plan_changesCreate{
                plan_changesCreate(plan_changes: {
                  business_id:${value.business_id}
                  plan_config:{type:"${value.value.plan}",allow_print:${value.value.printDirectly},couponIds:[${value.couponId}],price:${value.price}}
                  status:"active"
                }){
                  id
                  plan_config
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
  couponValidRequests(value, business_id) {
    console.log(value, business_id)
    try {
      let data = client.mutate({
        mutation: gql`
                mutation businessCouponCreate{
                CreateBusinessCoupon(
                  input:{
                    business_id:${business_id}
                    code:"${value}"
                  }
                ){    
                    id
                    coupon_id
                    name
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
  getPlanInformationActionRequests(business_id) {
    console.log(business_id)
    try {
      let data = client.mutate({
        mutation: gql`
                query validated_coupons{
                validated_coupons(
                  where:{business_id:${business_id.business_id}}){
                  id
                  coupon_id
                  coupon
                  value
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
  getPlanDataActionRequests(business_id) {
    console.log(business_id)
    try {
      let data = client.mutate({
        mutation: gql`
                query plan_changes{
                plan_changes(
                  where:{business_id:${business_id}}){
                plan_config
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
  getCouponListRequests(couponId) {
    console.log(couponId)
    try {
      let data = client.mutate({
        mutation: gql`
               query all_coupons{
                all_coupons(
                  where:{id:[${couponId}]}){
                  coupon
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