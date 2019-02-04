import {
  GLOBAL_ADD
} from '../types/globaldata'

import {
  createAction
} from 'redux-actions'

export const globalAdd = createAction(GLOBAL_ADD, globdata => globdata)
