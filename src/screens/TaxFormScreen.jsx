import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import taxService from '../services/taxes';
import { useStateValue, getInputFields, addSubmission } from '../state';
import InputField from '../components/InputField';

function TaxFormScreen({ route, navigation }) {
  const { taxId } = route.params;
  const [{ inputFields }, dispatch] = useStateValue();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadFormFields = async (id) => {
      try {
        const result = await taxService.getForm(id);
        dispatch(getInputFields(result));
      } catch (e) {
        console.error(e.message);
      }
    };

    loadFormFields(taxId);
  }, [taxId, dispatch]);

  const onSubmit = async (data) => {
    try {
      const submission = await taxService.addSubmission({ ...data, taxId }, taxId);
      dispatch(addSubmission(submission));
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {inputFields.map((inputField) => {
        return (
          <View key={inputField.id}>
            <InputField control={control} inputField={inputField} errors={errors} />
          </View>
        );
      })}

      <Pressable title="Submit" onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButton}>SUBMIT</Text>
      </Pressable>
    </View>
  );
}

export default TaxFormScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    marginHorizontal: 20,
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
});
