# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

This Todo app includes:
- ✅ Modern React Native with Expo
- ✅ Beautiful gradient UI with dark/light theme support
- ✅ Convex backend for real-time data sync
- ✅ **Native iOS Components** including haptic feedback
- ✅ TypeScript for type safety
- ✅ File-based routing with Expo Router

## Native iOS Components

This app leverages native iOS components for an authentic iOS experience:

- **Haptic Feedback**: Native iOS haptic feedback on user interactions (add, toggle, edit, delete)
- More native components available - see [NATIVE_IOS_COMPONENTS.md](./NATIVE_IOS_COMPONENTS.md) for the complete guide

### iOS Components Documentation

📖 **[NATIVE_IOS_COMPONENTS.md](./NATIVE_IOS_COMPONENTS.md)** - Comprehensive guide covering:
- 10+ native iOS components with detailed analysis
- UITableView, UITextField, UIProgressView, SF Symbols, UIContextMenu, and more
- Implementation approaches and recommended packages
- Accessibility and performance considerations

💻 **[IOS_IMPLEMENTATION_EXAMPLES.md](./IOS_IMPLEMENTATION_EXAMPLES.md)** - Practical implementation guide:
- Step-by-step code examples for each component
- Quick start implementations (no installation to custom modules)
- Testing checklist and common issues
- Build and deployment instructions

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Testing Native iOS Features

**Note**: Some features like haptic feedback only work on physical iOS devices, not in the simulator.

To test on a physical device:
```bash
npx expo run:ios --device
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
