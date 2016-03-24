##Build log parser

This helps parse the build logs from the Intel® XDK (and Cordova) into an easier to read format when it fails.

##How to use

Select a file, or drag one and let it do it's magic.  This tool will find the exact error message and make it easier to see.  If it's a common error, we also have tips on how to resolve it.

##Adding errors

To add another common error, add an entry to errors.js

```

{
    pattern:'', //String pattern to look for.  Not a regex, but hard coded
    message:'' //custom message to display
}

e.g

{
    pattern:'Code Sign error: Provisioning profile does not match bundle identifier',
    message:'Your XDK project ID does not match your provisioning profile.  Please go to the project settings tab for your app and verify the build settings.  Also mak sure you have the correct provisioning profile selected.'
}
```