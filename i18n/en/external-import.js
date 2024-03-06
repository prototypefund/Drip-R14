export default {
  texts: {
    title: 'Import Clue Data',
    email: 'E-Mail',
    password: 'Password',
    submit: 'Submit',
    close: 'Close',
    explainer:
      'Before you import your data from Clue into our app, we want to ensure\n' +
      'you understand how this process works and the measures we take to\n' +
      'protect your privacy and security. ',
    privacy: {
      title: 'Your Privacy Matters',
      description:
        "We take your privacy seriously. That's why drip. doesn't have a server,\n" +
        'and we can never access or read the email and password you provide. Your\n' +
        'sensitive information remains entirely on your device.',
    },
    onetime: {
      title: 'One-time Import, No Strings Attached',
      description:
        'This is a one-time operation! You will use your Clue account credentials\n' +
        'for a single authentication, and immediately after the data transfer,\n' +
        'your email and password are not stored, saved, or retained anywhere on\n' +
        'the app or anywhere else.',
    },
    control: {
      title: 'Control Your Data',
      description:
        "You're in charge! After importing, you can review and manage your data\n" +
        'within drip. just as you did in other apps. We believe in giving you\n' +
        'full control.',
    },
    alternative: {
      title: 'Easy Alternatives',
      description:
        'If you prefer not to use your email and password, no worries! You can\n' +
        'also request your data from Clue through a GDPR request and manually\n' +
        'import it here. This process is more privacy-friendly but may take a\n' +
        'little longer.',
    },
    choice: {
      title: 'Your Data, Your Choice',
      description:
        'Importing from Clue is completely optional. This will create a one-time\n' +
        "internet connection but doesn't do anything after that.",
    },
    ready: {
      title: 'Ready to Get Started?',
      description:
        "Whenever you're ready, simply enter your Clue account credentials, hit " +
        '"{{button}}",and take a look at your data over here.',
    },
  },
  errors: {
    network: {
      title: 'No internet connection.',
      message: 'Please make sure you are connected.',
    },
    auth: {
      title: 'Failure to authenticate',
      message: 'Please check your email & password',
    },
    parsing: {
      title: 'Failure to parse data',
      message: 'Your data has an unknown format. Feel free to reach out.',
    },
    permissions: {
      title: 'You did not grant drip. internet access',
      message: 'Without internet, you need to manually upload your file',
    },
  },
  internet: {
    title: 'Internet Access Required',
    message:
      'This action requires one-time internet access. Do you want to proceed?',
  },
}
