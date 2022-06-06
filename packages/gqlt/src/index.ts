/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import { gql } from 'graphql-tag';
import { useQuery } from '@apollo/client';

const { data } = useQuery(gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
    }
    users {
      id
    }
  }
`);

const { data: foo } = useQuery(gql`
  query To($id: ID!) {
    user(id: $id) {
      id
      name
    }
    users {
      id
    }
  }
`);

const { data: azer } = useQuery(gql`
  query User2($id: ID!) {
    authByGoogle(code: "foo") {
      id
      accessToken
    }
    user(id: $id) {
      id
      name
    }
    users {
      id
    }
  }
`);

console.log(data?.user.name);
console.log(foo?.users[0].id);
console.log(azer?.authByGoogle.accessToken);

export {};
