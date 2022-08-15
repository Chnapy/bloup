import { gql, useQuery } from '@apollo/client';

export const Foo: React.FC = () => {
  const { data } = useQuery(
    gql(`
      query Foo {
        users {
          id
          name
        }
      }
  `)
  );

  return <div>foo {data?.users.map((user) => user.name)}</div>;
};
