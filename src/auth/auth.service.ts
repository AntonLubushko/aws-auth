import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class AuthService {
  private readonly client = new CognitoIdentityProviderClient({
    region: process.env.REGION,
  });

  async registerUser(email: string, password: string): Promise<any> {
    const command = new SignUpCommand({
      ClientId: process.env.CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    });

    try {
      const result = await this.client.send(command);
      return result;
    } catch (error) {
      return {
        code: error.$metadata.httpStatusCode,
        message: error.message,
      };
    }
  }

  async confirmUser(email: string, confirmationCode: string): Promise<any> {
    const command = new ConfirmSignUpCommand({
      ClientId: process.env.CLIENT_ID,
      Username: email,
      ConfirmationCode: confirmationCode,
    });

    try {
      const result = await this.client.send(command);
      return result;
    } catch (error) {
      return {
        code: error.$metadata.httpStatusCode,
        message: error.message,
      };
    }
  }

  async signInUser(username: string, password: string): Promise<any> {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    try {
      const response = await this.client.send(command);
      return {
        message: 'Success authentication',
        token: response.AuthenticationResult.IdToken,
      };
    } catch (error) {
      return {
        code: error.$metadata.httpStatusCode,
        message: error.message,
      };
    }
  }
}
