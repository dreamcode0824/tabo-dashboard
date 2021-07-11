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
  getAllEmployeesRequests(business) {
    try {
      let data = client.mutate({
        mutation: gql`
              query business_users{
              business_user(where:{
                business_id:${business.filterBusinessList.id}
              }){
                 id
                name
                password
                verified
                role
                color
                unlock_code
                updated_at
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
  createActionsRequests(employeeData, business) {
    try {
      let data = client.mutate({
        mutation: gql`
              mutation business_userCreate{
              business_userCreate(business_user:{
                name:"${employeeData.name}"
                verified:false
                unlock_code:${employeeData.unlock_code}
                role:"${employeeData.role}"
                business_id:${business.filterBusinessList.id}
                color:"blue"
                password:"111"
              }){
                id
                name
                verified
                password
                role
                color
                unlock_code
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
  updateActionsRequests(employeeData) {
    try {
      let data = client.mutate({
        mutation: gql`
              mutation business_userUpdate{
              business_userUpdate(business_user:{
                id:${employeeData.id}
                name:"${employeeData.name}"
                verified:false
                unlock_code:${employeeData.unlock_code}
                role:"${employeeData.role}"
                color:"blue"
                password:"111"
              }){
                id
                name
                password
                verified
                password
                role
                color
                unlock_code
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
  deleteActionsRequests(id) {
    console.log(id)
    try {
      let data = client.mutate({
        mutation: gql`
              mutation business_userDelete{
              business_userDelete(id:${id})
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
  employeeNameValidationActionRequests(name, value) {
    try {
      let data = client.mutate({
        mutation: gql`
             query business_user{
              business_user(where:{
                name:"${value}"
              }){
              unlock_code
                name
                id
                role
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
  employeeCodeValidationActionRequests(name, value) {
    try {
      let data = client.mutate({
        mutation: gql`
            query business_user{
              business_user(where:{
                unlock_code:"${value}"
              }){
              unlock_code
                name
                id
                role
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