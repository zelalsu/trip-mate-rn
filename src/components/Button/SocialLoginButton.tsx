// src/components/GoogleSignInButton.tsx

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import GoogleIcon from '@assets/svg/google.svg';
import BlackAppleIcon from '@assets/svg/blackApple.svg';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {StyleSheet} from 'react-native';
import {Colors} from '@constants/colors';

const SocialLoginButton = ({style}: any) => {
  async function handleGoogleSignIn() {
    // GoogleSignin.configure({
    //   iosClientId:
    //     '28063342004-8re4ro7qtk6sb5h84qut5evd1tj508jk.apps.googleusercontent.com',
    //   scopes: ['profile', 'email'],
    // });
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   const access_token = await GoogleSignin.getTokens();
    //   socialLogin({
    //     provider: 'google',
    //     email: userInfo.data.user.email,
    //     name: userInfo.data.user.givenName + userInfo.data.user.familyName,
    //     access_token: access_token.accessToken,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  //   React.useEffect(() => {
  //     if (isSuccess) {
  //       dispatch(
  //         setUserSessionInfo({
  //           access_token: socialLoginData?.data.access_token,
  //           refresh_token: socialLoginData?.data.refresh_token,
  //           token_type: socialLoginData?.data.token_type,
  //         }),
  //       );
  //       dispatch(setLogin(true));
  //     }
  //   }, [isSuccess]);

  return (
    <>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          style={[styles.iconWrapper, style]}>
          <GoogleIcon width={22} height={22} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.iconWrapper, style]}>
          <BlackAppleIcon width={22} height={22} />
        </TouchableOpacity>
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={[styles.orText, style && {color: 'red'}]}>OR</Text>
        <View style={styles.line} />
      </View>
    </>
  );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    marginTop: 40,
  },

  iconWrapper: {
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    padding: 10,
    borderRadius: 25,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
  },
  line: {
    height: 0.5,
    backgroundColor: 'gray',
    flex: 1,
  },
  orText: {
    color: Colors.darkGray,
    marginHorizontal: 10,
  },
});
