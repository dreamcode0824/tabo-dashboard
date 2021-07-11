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
  activityDatePeriodRequests(value, business_id) {
    try {
      let data = client.mutate({
        mutation: gql`
              mutation business_yearCreate{
              business_yearCreate(
                business_year:{
                  year:2020
                  start:"${value.startDate}"
                  end:"${value.endDate}"
                  business_id:${business_id}
                }
              ){    
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
  updateActivityDatePeriodRequests(value, business_id, id, grid) {
    try {
      let data = client.mutate({
        mutation: gql`
              mutation business_yearUpdate{
              business_yearUpdate(
                business_year:{
                  id:${id}
                  year:2021
                  start:"${grid.startDate}"
                  end:"${grid.endDate}"
                  business_id:${business_id}
                }
              ){    
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
  getActivityPeriodRequests(business_id) {
    try {
      let data = client.mutate({
        mutation: gql`
              query business_year{
              business_year(
                where:{business_id:${business_id}}){
                id
                year
                start
                end
                business_id,
                closed_days
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
  saveWorkHourActionRequests(business_id, gridValue) {
    try {
      let data = client.mutate({
        mutation: gql`
              mutation business_weekCreate{
              business_weekCreate(
                business_week:{
                  business_id:${business_id}
                 mon:"${gridValue[0].status}"
                  mon_start:"${gridValue[0].from}"
                  mon_end:"${gridValue[0].to}"
                  mon_start_break:"${gridValue[0].break_from}"
                  mon_end_break:"${gridValue[0].break_to}"
                  tue:"${gridValue[1].status}"
                  tue_start:"${gridValue[1].from}"
                  tue_end:"${gridValue[1].to}"
                  tue_start_break:"${gridValue[1].break_from}"
                  tue_end_break:"${gridValue[1].break_to}"
                  wed:"${gridValue[2].status}"
                  wed_start:"${gridValue[2].from}"
                  wed_end:"${gridValue[2].to}"
                  wed_start_break:"${gridValue[2].break_from}"
                  wed_end_break:"${gridValue[2].break_to}"
                  thu:"${gridValue[3].status}"
                  thu_start:"${gridValue[3].from}"
                  thu_end:"${gridValue[3].to}"
                  thu_start_break:"${gridValue[3].break_from}"
                  thu_end_break:"${gridValue[3].break_to}"
                  fri:"${gridValue[4].status}"
                  fri_start:"${gridValue[4].from}"
                  fri_end:"${gridValue[4].to}"
                  fri_start_break:"${gridValue[4].break_from}"
                  fri_end_break:"${gridValue[4].break_to}"
                  sat:"${gridValue[5].status}"
                  sat_start:"${gridValue[5].from}"
                  sat_end:"${gridValue[5].to}"
                  sat_start_break:"${gridValue[5].break_from}"
                  sat_end_break:"${gridValue[5].break_to}"
                  sun:"${gridValue[6].status}"
                  sun_start:"${gridValue[6].from}"
                  sun_end:"${gridValue[6].to}"
                  sun_start_break:"${gridValue[6].break_from}"
                  sun_end_break:"${gridValue[6].break_to}"
                }
              ){    
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
  updateWorkHourActionRequests(business_id, gridValue, id) {
    try {
      let data = client.mutate({
        mutation: gql`
              mutation business_weekUpdate{
              business_weekUpdate(
                business_week:{
                  id:${id}
                  business_id:${business_id}
                  mon:"${gridValue[0].status}"
                  mon_start:"${gridValue[0].from}"
                  mon_end:"${gridValue[0].to}"
                  mon_start_break:"${gridValue[0].break_from}"
                  mon_end_break:"${gridValue[0].break_to}"
                  tue:"${gridValue[1].status}"
                  tue_start:"${gridValue[1].from}"
                  tue_end:"${gridValue[1].to}"
                  tue_start_break:"${gridValue[1].break_from}"
                  tue_end_break:"${gridValue[1].break_to}"
                  wed:"${gridValue[2].status}"
                  wed_start:"${gridValue[2].from}"
                  wed_end:"${gridValue[2].to}"
                  wed_start_break:"${gridValue[2].break_from}"
                  wed_end_break:"${gridValue[2].break_to}"
                  thu:"${gridValue[3].status}"
                  thu_start:"${gridValue[3].from}"
                  thu_end:"${gridValue[3].to}"
                  thu_start_break:"${gridValue[3].break_from}"
                  thu_end_break:"${gridValue[3].break_to}"
                  fri:"${gridValue[4].status}"
                  fri_start:"${gridValue[4].from}"
                  fri_end:"${gridValue[4].to}"
                  fri_start_break:"${gridValue[4].break_from}"
                  fri_end_break:"${gridValue[4].break_to}"
                  sat:"${gridValue[5].status}"
                  sat_start:"${gridValue[5].from}"
                  sat_end:"${gridValue[5].to}"
                  sat_start_break:"${gridValue[5].break_from}"
                  sat_end_break:"${gridValue[5].break_to}"
                  sun:"${gridValue[6].status}"
                  sun_start:"${gridValue[6].from}"
                  sun_end:"${gridValue[6].to}"
                  sun_start_break:"${gridValue[6].break_from}"
                  sun_end_break:"${gridValue[6].break_to}"
                }
              ){    
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
  getWorkHourRequests(business_id) {
    try {
      let data = client.mutate({
        mutation: gql`
             query business_week{
              business_week(
                where:{business_id:${business_id}}){
                id
                mon
                mon_start
                mon_end
                tue
                tue_start
                tue_end
                wed
                wed_start
                wed_end
                thu
                thu_start
                thu_end
                fri
                fri_start
                fri_end
                sat
                sat_start
                sat_end
                sun
                sun_start
                sun_end
                mon_start_break
                mon_end_break
                tue_start_break
                tue_end_break
                wed_start_break
                wed_end_break
                thu_start_break
                thu_end_break
                fri_start_break
                fri_end_break
                sat_start_break
                sat_end_break
                sun_start_break
                sun_end_break
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
  getZoneNamesRequests(business, grid) {
    try {
      let data = client.mutate({
        mutation: gql`
            query custom_query{
            custom_query(where:{
              name:"zone_names"
              type:"${business.filterBusinessList.type}"
              count:${grid.zoneCount}
            }){
              id
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
  saveZoneNamesRequests(value, business, grid) {
    let arr = [];
    for (let i = 0; i < Number(grid.zoneCount); i++) {
      if (i == 0) {
        arr.push(`{
          name:"${Number(grid.zoneCount) == 1 ? "noName" : grid.zone1}"
          id:"${grid.id1}"
          config:{
            slug:"zone1"
          }
      }`)
      }
      if (i == 1) {
        arr.push(`{
          name:"${grid.zone2}"
          id:"${grid.id2}"
          config:{
            slug:"zone2"
          }
      }`)
      }
      if (i == 2) {
        arr.push(`
         {
          name:"${grid.zone3}"
          id:"${grid.id3}"
          config:{
            slug:"zone3"
          }
        } 
      `)
      }
      if (i == 3) {
        arr.push(`{
         
          name:"${grid.zone4}"
          id:"${grid.id4}"
          config:{
            slug:"zone4"
          }
         
      }`)
      }
    }
    if (grid.hasVipZone) {
      arr.push(`{
          name:"VIP"
          id:"${grid.idVIP}"
          config:{
            slug:"VIP"
          }
      }`)
    }
    console.log(arr)
    try {
      let data = client.mutate({
        mutation: gql`
            mutation SaveTypes{
            SaveZones(input:{
              businessId:${business.filterBusinessList.id}
              list:[${arr.join('')}],
            }){
              zones{
                id
                name
                config
                business_id
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
  getZoneActionRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
           query zone{
            zone(
              where:{business_id:${business.filterBusinessList.id}}){
                id
                name
              config
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
  updateZoneNamesRequests(value, business, grid) {
    try {
      let data = client.mutate({
        mutation: gql`
            mutation zoneUpdate{
            zoneUpdate(
              zone:{
                id:${grid.id}
                name:"Zone"
                config:{zone1:"${grid.zone1}",zone2:"${grid.zone2}",zone3:"${grid.zone3}",zone4:"${grid.zone4}",vip_zone:${grid.hasVipZone},count:${grid.zoneCount}}
                business_id:${business.filterBusinessList.id}
              }
            ){    
              config
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
  saveClosedDaySagaRequests(businessId, days) {
    try {
      let arr = [];
      if (days.length > 0) {
        days.map((item, index) => {
          arr.push(`{
            id:${index}
            closed_day:"${item}"
          }`)
        })
      }
      let data = client.mutate({
        mutation: gql`
            mutation UpdateClosedDays{
            UpdateClosedDays(
              input:{
                id:${businessId}
                closed_days:[${arr.join('')}],
              }
            ){    
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
  saveTimeLineRequests(timeArrs, businessId, timeLineData) {
    try {
      console.log(timeLineData, "******************")
      let arr = [];
      timeArrs.map((item, index) => {
        let itemArr = [];
        item.arrs.map((list, index) => {
          itemArr.push(`
           {
              id:${index}
              time:"${list}"
           }
          `)
        })
        arr.push(`
          {
            id:${index}
          day_name:"${item.name}"
          time_line:[${itemArr.join('')}]
          }
        `)
      })
      let data = client.mutate({
        mutation: gql`
           mutation UpdateTimeLine {
              UpdateTimeLine(input: 
              {
                time_lines:[${arr.join('')}],
                business_id:${businessId}
              }
              ) {
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
  getTimeLineRequests(businessId) {
    try {
      let data = client.mutate({
        mutation: gql`
            query time_line {
              time_line(where: {
                business_id:${businessId}
              }) {
              id
            time
            full
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
  getTemporaryRequests(id, value) {

    try {
      let data = client.mutate({
        mutation: gql`
        mutation business_settingsUpdate{
          business_settingsUpdate(
            business_settings:{
              id:${id}
              temporary_closed:${value}
            }
          ){    
              temporary_closed
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
  createBusinessSettingTemporary_closedRequests(id, value) {
    try {
      let data = client.mutate({
        mutation: gql`
        mutation business_settingsCreate{
          business_settingsCreate(
            business_settings:{
              business_id:${id}
              temporary_closed:${value}
            }
          ){    
              temporary_closed
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
  gridSaveDataRequests(value, businessId) {
    try {
      console.log(value, "(((((^^^^^^^^^^^^^^^^")
      let data = client.mutate({
        mutation: gql`
        mutation SaveGridData{
          SaveGridData(input :{
            business_id:${businessId}
            data:[${value.join('')}],
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