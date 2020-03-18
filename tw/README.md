# TW

> A Tailwind-based responsive composable styling library for React Native for web

Extends on [react-native-tailwindcss](https://tvke.github.io/react-native-tailwindcss/) by implementing support for:

- pseudo-classes: `hover`, `focus` and `active`
- breakpoints: `sm`, `md`, `lg` and `xl`
- string template

It can be used with any Component. However, support for pseudo-classes and breakpoints only works for components
`tw` exports.

## Usage

### Basic usage

```js
import { classes as cls, View, Text } from "tw";

export default function Component() {
  return (
    <View style={cls`bg-white hover:bg-red`}>
      <Text>Hello hoverworld !</Text>
    </View>
  );
}
```

### Composition

It is possible to extend styles using the `classes` string literal function.  
This is useful to react to other events than `hover` or `focus`, such as reflecting
some application state change.

```js
import { classes as cls, View, Text } from "tw";

export default function Component({ opacity }) {
  return (
    <View style={cls`bg-white hover:bg-red ${{ opacity }}`}>
      <Text>Hello hoverworld !</Text>
    </View>
  );
}
```

### Animated Components

`tw` re-exports every component from ReactNative's Animated, with pseudo-classes and breakpoints support.

```js
import { classes as cls, AnimatedView, Text } from "tw";

export default function Component({ opacity }) {
  return (
    <AnimatedView style={cls`bg-white hover:bg-red ${{ opacity }}`}>
      <Text>Hello animated opacity view !</Text>
    </AnimatedView>
  );
}
```

### Exported responsive components

`tw` re-exports the following ReactNative components, with pseudo-classes and breakpoints support:

- Button
- FlatList
- Image
- ImageBackground
- InputAccessoryView
- KeyboardAvoidingView
- Picker
- SafeAreaView
- SectionList
- ScrollView
- Switch
- Text
- TextInput
- View
- AnimatedImage
- AnimatedScrollView
- AnimatedText
- AnimatedView
- AnimatedFlatList
- AnimatedSectionList

### Referring to tailwind colors

It is possible to get the hexstring value of a Tailwind color with
the `getColor()` function

```js
import { getColor } from "tw";

// Default color == "#3182CE"
const DEFAULT_COLOR = getColor("blue-600");
```

### Making your component work with pseudo-classes

```js
import { wrapComponent } from "tw"

export ResponsiveComponent = wrapComponent(NonResponsiveComponent, [
  "style" // the name of the style property
]);
```
