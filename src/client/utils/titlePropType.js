const MAX_LENGTH = 80;

const titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    const value = props[propName];
    if (typeof value !== 'string' || value.length > MAX_LENGTH) {
      return new Error(
        `${propName} in ${componentName} is longer than 80 characters.`
      );
    }
  }
  return true;
};

export default titlePropType;
