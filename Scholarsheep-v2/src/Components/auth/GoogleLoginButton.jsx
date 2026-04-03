import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

/**
 * GoogleLoginButton — renders the Google "Sign in with Google" button.
 * On success, passes the credential token to the parent's onSuccess handler.
 */
const GoogleLoginButton = ({ onSuccess, onError }) => {
  return (
    <div className="flex justify-center my-4">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (onSuccess) {
            onSuccess(credentialResponse.credential);
          }
        }}
        onError={() => {
          if (onError) {
            onError('Google login failed');
          }
        }}
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="300"
      />
    </div>
  );
};

export default GoogleLoginButton;
