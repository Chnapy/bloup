import { registerEnumType } from '@nestjs/graphql';

export enum Toto {
  FOO,
  BAR,
}

registerEnumType(Toto, {
  name: 'Toto',
});
