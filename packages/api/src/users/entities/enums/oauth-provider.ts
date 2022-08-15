import { registerEnumType } from '@nestjs/graphql';

export enum OAuthProvider {
  GOOGLE = 'google',
}

registerEnumType(OAuthProvider, {
  name: 'OAuthProvider',
});
