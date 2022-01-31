import globalConfiguration from '../../shared/configuration';

export default () => {
    const environmentVariables = globalConfiguration(process.env.APP_ENV);
    console.log('---------------environment Variables', environmentVariables);

    return {
        ...environmentVariables,
    };
};
