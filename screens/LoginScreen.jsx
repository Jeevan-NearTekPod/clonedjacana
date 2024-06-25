// import {View, Text, StyleSheet} from 'react-native';
// import React from 'react';
// import {Button} from 'react-native-paper';

// const LoginScreen = props => {
//   return (
//     <View style={styles.container}>
//       <Text >LoginScreen</Text>
//       <Button
//         title="HomePage"
//         onPress={() =>
//           props.navigation.navigate('UploadImage', {
//             name: 'jeevan',
//           })
//         }
//       />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     },

// });
// export default LoginScreen;
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  // Button,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
// import LottieView from 'lottie-react-native';

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    let valid = true;
    if (userName === '') {
      setUserNameError('User Name is required');
      valid = false;
    } else {
      setUserNameError('');
    }

    if (password === '') {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!isChecked) {
      setCheckboxError('You must agree to continue');
      valid = false;
    } else {
      setCheckboxError('');
    }

    if (valid) {
      // Alert.alert('Success', 'Form submitted successfully');
      navigation.navigate('Main');
      // Clear input fields
      setUserName('');
      setPassword('');
      setIsChecked(false);
      // navigation.navigate('Settings');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../Assets/logo.png')} />
      <View style={styles.secContainer}>
        <Text style={styles.ltext}>Login</Text>
        <Text style={styles.text}>Enter User Name:</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter your name"
        />
        {userNameError ? (
          <Text style={styles.errorText}>{userNameError}</Text>
        ) : null}
        <Text style={styles.text}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry={true}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <CheckBox
          title="Agree and continue"
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
        />
        {checkboxError ? (
          <Text style={styles.errorText}>{checkboxError}</Text>
        ) : null}
        {/* <Button title="Submit" onPress={handleSubmit} /> */}

        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.butto}>
            <Text style={styles.buttoText}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <LottieView
        source={require('../path/to/animation.json')}
        colorFilters={[
          {
            keypath: 'button',
            color: '#F00000',
          },
          {
            keypath: 'Sending Loader',
            color: '#F00000',
          },
        ]}
        autoPlay
        loop
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 170,
    height: 50,
    marginBottom: 50,
  },
  input: {
    height: 40,
    width: 290,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
    backgroundColor: '#469af0',
    borderRadius: 30,
  },
  buttoText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  butto: {
    padding: 10,
    borderRadius: 90,
    fontSize: 20,
    // position: 'absolute',
    marginTop: 20,
    backgroundColor: '#469af0',
    // padding: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 12,
  },
  secContainer: {
    width: 340,
    padding: 20,
    backgroundColor: '#fff', // Light gray background for neumorphism
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Black shadow color
    shadowOffset: {width: 6, height: 6}, // Shadow offset for bottom-right shadow
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 10, // Shadow radius
    elevation: 10, //
  },
  ltext: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    margin: 20,
  },
});
export default LoginScreen;
