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
  getAllElementsRequests() {
    try {
      let data = client.mutate({
        mutation: gql`
              query element{
              element(
                order:"id"){
              type
                id
                structure
                width
                height
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
  createElementInformationRequests(business, element) {
    console.log(element.elementInformation.length, "-------------------->length")
    console.log(business, element, element.zoomRate, element.zoomAreaValue, element.displayValue)
    // console.log(element.lastElements.length)
    let arr = [];
    element.elementInformation.map((item, index) => {
      arr.push(`{
        id: "${item.id}"
        position: {
          x: ${item.x / element.zoomRate}
          y: ${item.y / element.zoomRate}
          number: "${item.number}"
          zoomRate:${element.zoomRate}
          zoomAreaValue:${element.zoomAreaValue ? element.zoomAreaValue : 0.8}
          displayValue:${element.displayValue ? element.displayValue : 1}
        }
        rotate_angle:${item.r}
        element_id: ${item.elementId}
        business_id: ${business.filterBusinessList.id},
        table_number:"${item.number}"
        unique_id:${index}
        is_vip: false
      }`)
    })
    console.log(arr, arr.length, "----------------->elements")
    try {
      let data = client.mutate({
        mutation: gql`
               mutation CreateGrid{
                CreateGrid(input:{
                  moved:"${element.lastMoved1 ? element.lastMoved1 : ""}"
                  moved1:"${element.lastMoved2 ? element.lastMoved2 : ""}"
                  list:[${arr.join('')}],
                  businessId:${business.filterBusinessList.id}
                }){
                  businesse_elements{
                    id
                    position
                    rotate_angle
                    is_vip
                    element_id
                    zone_id
                  }
                  moved
                  moved1
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
  getBusinessElementsRequest(business) {
    try {
      let data = client.mutate({
        mutation: gql`
               query business_element{
                business_element(
                  where:{business_id:${business.filterBusinessList.id}}){
                  id
                  position
                  deleted
                  rotate_angle
                  is_vip
                  element_id
                  business_id
                  business{
                    location
                  }
                  zone_id
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
  updateSeatNumberRequests(business, element, currentId, number) {
    let filterResult = element.resultElements.filter(ele => ele.id == currentId)
    try {
      let data = client.mutate({
        mutation: gql`
            mutation business_elementUpdate{
            business_elementUpdate(
              business_element:{
                id:${currentId}
                position:{x:${filterResult[0].position.x},y:${filterResult[0].position.y},number:"${number}"},
                table_number:"${number}"
              }
            ){    
              id
              position
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
  getZonesActionRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
           query zone{
            zone(
              where:{business_id:${business.filterBusinessList.id}}){
                id
              config
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
  createSetZonesRequests(element) {
    let arr = [];
    element.dotsData.map((item, index) => {
      arr.push(`{
        id: ${item.id}
        zone_id:${item.zone_id}
      }`)
    })
    console.log(arr)
    try {
      let data = client.mutate({
        mutation: gql`
          mutation MassSaveZones{
          MassSaveZones(input:{
            list:[${arr.join('')}],
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