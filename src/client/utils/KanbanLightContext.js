import { createContext } from 'react';

const KanbanLightContext = createContext({
  taskCallbacks: {
    add: () => {},
    delete: () => {},
    toggle: () => {}
  }
});

export default KanbanLightContext;
