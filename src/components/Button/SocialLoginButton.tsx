// src/components/GoogleSignInButton.tsx

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import GoogleIcon from '@assets/svg/google.svg';
import BlackAppleIcon from '@assets/svg/blackApple.svg';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {StyleSheet} from 'react-native';
import {Colors} from '@constants/colors';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const SocialLoginButton = ({style}: any) => {
  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.warn(JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.warn(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.warn(error);
      } else {
        console.warn(error);
      }
    }
  };

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
          onPress={googleLogin}
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
