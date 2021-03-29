import validateProjectName from 'validate-npm-package-name';

export const setupValidations = {
  appName(appName: string) {
    const { validForNewPackages, errors } = validateProjectName(appName);

    if (!validForNewPackages && errors) {
      return errors[0];
    }

    return true;
  },
};
