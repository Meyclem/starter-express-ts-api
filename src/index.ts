const testFunction: (...args: string[]) => string = (...args) =>
  args.reduce(
    (previousValueWithATooLongNameToCheckLineWrapping, currentValueWithATooLongNameToCheckLineWrapping) =>
      `${previousValueWithATooLongNameToCheckLineWrapping} ` + currentValueWithATooLongNameToCheckLineWrapping,
  );

export default testFunction;
