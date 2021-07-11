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
  getStructureElementRequests(id) {
    try {
      let data = client.mutate({
        mutation: gql`
              query business_element{
              business_element(where:{
                zone_id:${id}
              }){
                id
                element_id
              element{
                type
                structure
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
  createPricePlanRequests(elementType, priceData, business, price, filterResult) {
    console.log(priceData)
    let arr = [];
    priceData.map((list) => {
      if (list.equalPrice) {
        arr.push(`{
            price: {
              monday:${list.equalValue}
              tuesday:${list.equalValue}
              wednesday:${list.equalValue}
              thursday:${list.equalValue}
              friday:${list.equalValue}
              saturday:${list.equalValue}
              sunday:${list.equalValue}
            }
            type:"${elementType}"
            seat_count:null
            zone_id:${price.currentZoneId}
            element_id:null
            business_id:${business.filterBusinessList.id}
            start_date:"${list.startDate}"
            end_date:"${list.endDate}"
          }`)
      } else {
        arr.push(`{
            price: {
              monday:${list.priceData[0].price ? list.priceData[0].price : null}
              tuesday:${list.priceData[1].price ? list.priceData[1].price : null}
              wednesday:${list.priceData[2].price ? list.priceData[2].price : null}
              thursday:${list.priceData[3].price ? list.priceData[3].price : null}
              friday:${list.priceData[4].price ? list.priceData[4].price : null}
              saturday:${list.priceData[5].price ? list.priceData[5].price : null}
              sunday:${list.priceData[6].price ? list.priceData[6].price : null}
            }
            type:"${elementType}"
            seat_count:null
            zone_id:${price.currentZoneId}
            element_id:null
            business_id:${business.filterBusinessList.id}
            start_date:"${list.startDate}"
            end_date:"${list.endDate}"
          }`)
      }
    })
    console.log(arr)
    try {
      let data = client.mutate({
        mutation: gql`
              mutation CreateCustomPrice{
                CreateCustomPrice(input:{
                  list:[${arr.join('')}]
                }){
                  result
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
  getPriceRequests(price, business) {
    try {
      let data = client.mutate({
        mutation: gql`
              query price{
              price(where:{
                business_id:${business.filterBusinessList.id}
              }){
                id
                price
                seat_count
                start_date
                end_date
                business_id
                element_id
                type
                zone_id
                element{
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
  resetActionRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
             mutation DeleteCustomPrice{
              DeleteCustomPrice(input:{
                business_id:${business.filterBusinessList.id}
              }){
              result
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