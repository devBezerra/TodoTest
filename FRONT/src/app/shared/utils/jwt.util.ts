import {jwtDecode} from 'jwt-decode';

export class JwtServiceUtil {
  constructor() {}

  static getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      throw error;
    }
  }
}
