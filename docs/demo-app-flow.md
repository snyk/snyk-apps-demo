# Snyk Demo App Flow


This demo Snyk app is an example of how to use the Snyk Apps feature. This demo app has two major sections to it. First is the user side to give you the app user perspective i.e the users of your app. The second section is the admin section which gives you perspective about the admin side i.e. the creator or the maintainer of the app.


## User Section:


The user section has the projects page and the app settings page. Once the user adds the app to their Snyk organization they will be able to see these pages.


#### User Section Pages:

1. The first page that you see is that of the install page, which prompts the user to install the Snyk app if they haven't already
![Install Snyk App](images/user_install.png?raw=true "Install Snyk App")
2. Once you click the Install App button you will be taken to your Snyk account for provisioning the app with the required scopes of permissions. You will need to select your Snyk organization under which you will be installing the app. Once you select your Snyk organizations click the provision button
![Provision Snyk App](images/user_provision_app.png?raw=true "Provision Snyk App")
3. On success, the app is provisioned successfully. Users will be taken to the redirect URI provided by the developer of the app. In the demo app, on the callback success page, you can click on the `List Projects` or `List Projects (REST)` buttons to list the Snyk user's project. This gives you an example of how you can use scoped authorization token granted by the Snyk App's OAuth2 flow to access the Snyk API and build your application around it. Please note To visit your project listing you can also visit `localhost:3000/projects` or `localhost:3000/projects-rest` directly.
![User Projects Page](images/user_callback_page.png?raw=true "User Projects Page")
1. The last and fourth page for the user of the Snyk app is the settings page for the user(`localhost:3000/settings`). This is a dummy page to give you an idea of how the user can configure settings for the app once the app has been installed
![User App Settings](images/user_app_settings.png?raw=true "User App Settings")

## Admin Section:


The admin section of this app gives you the app admin perspective. The admin section has two pages i.e the app settings page for the admin and the app installs page for the admin

### Admin Section Pages:

1. The admin settings page(`localhost:3000/admin`) is a dummy page in the demo app to give you the creator of the app an idea of what the admin section can look like. In the future, you can update the app settings such as the icon of the app
![Admin App Settings](images/admin_app_settings.png?raw=true "Admin App Settings")
2. The admin app installs page(`http://localhost:3000/admin/installs`) lists the installs of the app i.e the information on the number of installs of the app by Snyk users
![Admin App Installs](images/admin_app_installs.png?raw=true "Admin App Installs")


## The Database for the App:


For demonstration purposes, we are using a lightweight JSON-based database called `lowdb`. Every time you provision the demo app. Each sign-in/sign-up is considered an installation for demonstration purposes. Both the `access_token` and `refresh_token` are saved to the database. The refresh token is used to refresh the auth token when it expires.
