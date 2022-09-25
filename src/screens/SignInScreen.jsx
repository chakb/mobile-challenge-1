import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as SecureStore from 'expo-secure-store';
import Logo from '../../assets/logo2.svg';
import { useStateValue, signIn } from '../state';

export function SignInContainer({ onSubmit }) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleOnSubmit = (data) => {
    // fake login, any password accepted unless it is 'wrong'
    if (data.password === 'wrong') {
      setError('password', { type: 'manual', message: 'Invalid password' });
      return;
    }

    onSubmit(data);
  };

  return (
    <>
      <Text style={styles.inputLabel}>Username</Text>
      <Controller
        control={control}
        rules={{ required: { value: true, message: 'Username is required' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            testID="username"
          />
        )}
        name="username"
      />
      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

      <Text style={styles.inputLabel}>Password</Text>
      <Controller
        control={control}
        rules={{ required: { value: true, message: 'Password is required' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            testID="password"
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Pressable title="Submit" onPress={handleSubmit(handleOnSubmit)}>
        <Text style={styles.submitButton}>LOGIN</Text>
      </Pressable>
    </>
  );
}

function SignInScreen() {
  const [, dispatch] = useStateValue();

  const onSubmit = async (data) => {
    // username is saved instead of the token the login api would return
    try {
      await SecureStore.setItemAsync('user', data.username);
      dispatch(signIn(data.username));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      <SignInContainer onSubmit={onSubmit} />
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  logo: {
    height: 100,
  },
  input: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 15,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#461481',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: -5,
    marginBottom: 10,
  },
});
