import * as React from 'react';

import FromStore from './FormStore';

const FormStoreContext = React.createContext<FromStore | undefined>(undefined);

export default FormStoreContext;