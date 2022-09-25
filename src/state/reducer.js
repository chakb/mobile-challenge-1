export const restoreUser = (user) => {
  return {
    type: 'RESTORE_USER',
    payload: user,
  };
};

export const signIn = (user) => {
  return {
    type: 'SIGN_IN',
    payload: user,
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};

export const initializeTaxSeasons = (taxSeasons) => {
  return {
    type: 'INITIALIZE_TAX_SEASONS',
    payload: taxSeasons,
  };
};
export const getInputFields = (inputFields) => {
  return {
    type: 'GET_INPUT_FIELDS',
    payload: inputFields,
  };
};
export const initializeSubmissions = (submissions) => {
  return {
    type: 'INITIALIZE_SUBMISSIONS',
    payload: submissions,
  };
};
export const addSubmission = (submission) => {
  return {
    type: 'ADD_SUBMISSION',
    payload: submission,
  };
};
export const deleteSubmission = (id) => {
  return {
    type: 'DELETE_SUBMISSION',
    payload: id,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_USER':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        user: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        user: null,
      };
    case 'INITIALIZE_TAX_SEASONS':
      return {
        ...state,
        taxSeasons: action.payload,
      };
    case 'GET_INPUT_FIELDS':
      return {
        ...state,
        inputFields: action.payload,
      };
    case 'INITIALIZE_SUBMISSIONS':
      return {
        ...state,
        submissions: action.payload,
      };
    case 'ADD_SUBMISSION':
      return {
        ...state,
        submissions: state.submissions.concat(action.payload),
      };
    case 'DELETE_SUBMISSION':
      return {
        ...state,
        submissions: state.submissions.filter(({ id }) => id !== action.payload),
      };
    default:
      return state;
  }
};
