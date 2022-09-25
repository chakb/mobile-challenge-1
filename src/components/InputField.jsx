import { Controller } from 'react-hook-form';
import { TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function InputField({ control, errors, inputField }) {
  const pickImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('image', image);
  };

  if (inputField.type === 'picture') {
    return (
      <>
        <Text style={styles.inputLabel}>{inputField.label}</Text>
        <Controller
          control={control}
          name={inputField.id}
          render={({ field }) => (
            <Pressable onPress={pickImage}>
              <MaterialIcons name="image-search" size={24} color="black" />
            </Pressable>
          )}
        />
      </>
    );
  } else {
    return (
      <>
        <Text style={styles.inputLabel}>{inputField.label}</Text>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: `${inputField.label} is required` },
            maxLength: {
              value: inputField.maxLength,
              message: `${inputField.label} max length is ${inputField.maxLength}`,
            },
          }}
          name={inputField.id}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={inputField.placeholder}
              value={value}
              keyboardType={inputField.type === 'number' ? 'numeric' : 'default'}
            />
          )}
        />
        {errors[inputField.id] && (
          <Text style={styles.errorText}>{errors[inputField.id].message}</Text>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
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
  errorText: {
    color: 'red',
    marginTop: -5,
    marginBottom: 10,
  },
});
