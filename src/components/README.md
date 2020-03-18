# Components

A collection of ready made and customizable components to be used
in association with React Native's collection.  
Check [React Native](https://reactnative.dev/docs/activityindicator) and [Expo](https://docs.expo.io/versions/v36.0.0/sdk/overview/) documentations for components that might be missing (activity indicator, lists, etc...)

- [Avatar](#avatar)
- [Badge](#badge)
- [Card](#card)
- [Portal](#prtal)
- [Snackbar](#snackbar)
- Layout
  - [Stack](#stack)
- Forms
  - [Button](#button)
  - [Checkbox](#checkbox)
  - [FlashBox](#flashbox)
  - [IconButton](#iconbutton)
  - [Input](#input)
  - [Link](#link)
  - [Radio](#radio)
- [Typography](#typography)

## Known to be missing

There is no:

- Date picker
- Time picker
- Other form of inputs (email, number, phone, sliders, color picker...)
- Dropdown (avoiding it is a good practice)
- Column or Grid layout components (but `tw` can solve this)

## Avatar

Displays a user's avatar. Falls back to `assets/avatar.jpg`.

#### Props

| prop  | type                                                                               | description                           |
| ----- | ---------------------------------------------------------------------------------- | ------------------------------------- |
| image | string (required)                                                                  | Url to the image                      |
| size  | number or one of `"xs"`,`"sm"`,`"md"`,`"lg"`,`"xl"` (optional, defaults to `"md"`) | If a number is given, size in pixels. |
| style | object or array                                                                    | style overrides                       |

#### Example

```jsx
<Avatar image="https://my.avatar.com/345.png" size="lg" />
```

## Badge

Useful component for tags, mutliple selects, etc.

#### Props

| prop          | type                                              | description                                                                                                       |
| ------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| classes       | Object (optional)                                 | Style overrides, see next section                                                                                 |
| image         | ReactNode                                         | A component to render before, or after the text                                                                   |
| color         | string (optional, defaults to `"gray-200"`)       | Badge color                                                                                                       |
| imagePosition | `"left"|"right"` (optional, defaults to `"left"`) | Where to draw the image                                                                                           |
| onDismiss     | Function (optional)                               | If present, the badge is dimissable and a close icon is drawn on the right. Called when the user clicks that icon |
| children      | string                                            | Badge text content                                                                                                |

#### Classes

| class     | description                                                    |
| --------- | -------------------------------------------------------------- |
| container | style the badge outer container. Background color, radius, ... |
| image     | image container                                                |
| text      | badge text, font, size, ...                                    |
| dismiss   | dismiss button styles                                          |

#### Built ins

By default badge color is gray. Although it can be set to any color, there are four predefined badges with colors:

- Badge.Error
- Badge.Warning
- Badge.Info
- Badge.Success

#### Example

```jsx
<Badge>Default Badge</Badge>
<Badge.Error>Error Badge</Badge.Error>
<Badge.Warning>Warning Badge</Badge.Warning>
<Badge.Success>Success Badge</Badge.Success>
<Badge.Info>Info Badge</Badge.Info>
<Badge dismissable onDismiss={() => {}}>
  Item #2
</Badge>
```

## Card

Cards are used to group information about subjects and their related actions.

Use the set of sub-components (`Card.Title`, `Card.Content`, ...) to allow for consistent appearance
accross the application without worrying about content structure.

Free-form card content can also be built using only `Card.Content`.

#### Props

| prop      | type                       | description                                                     |
| --------- | -------------------------- | --------------------------------------------------------------- |
| style     | Object or Array (optional) | Card container styles                                           |
| direction | `"vertical"|"horizontal"`  | Card direction                                                  |
| children  | Array                      | Must be a memeber of the dedicated `Card` components, see below |

#### Sub Components

- `Card.Content`: Required, Card content
- `Card.Title`: Optional, title for the card
- `Card.Image`: Optional, media for the card
- `Card.Actions`: Optional, Bottom right buttons
- `Card.Action`: Recommended child of `Card.Action`
- `Card.TopActions`: Optional, Top Right buttons (useually round icons)

#### Example

```jsx
<Card>
  <Card.Title>{post.title}</Card.Title>
  <Card.Content>{post.description}</Card.Content>
  <Card.Image source={post.thumbnail} />
  <Card.Actions>
    <Card.Action onPress={() => post.doSomething()}>Do something</Card.Action>
  </Card.Actions>
</Card>
```

## Portal

Renders its children over everything else in the application. Ideal for modals, snackbars etc.

There can be as many Portals as necessary in an application. They will be rendered on top of each other,
the last portal rendered will cover the others.

### Example

```jsx
<Portal>
  {shouldShow && (
    <View>
      <Text>Something to display on top of everything</Text>
    </View>
  )}
</Portal>
```

## Snackbar

A Toast-like, Snackbar component inspired by Google's Material Design.

#### Props

| prop    | type             | description                     |
| ------- | ---------------- | ------------------------------- |
| visible | boolean          |                                 |
| actions | Array (optional) | buttons shown on the right side |

##### Actions

```ts
interface Action {
  text: string;
  color?: string; // a Tailwing color, defaults to blue-600,
  onPress: Function;
}
```

#### Example

```jsx
<Snackbar
  visible={showSnackbar}
  actions={[
    {
      text: "Undo",
      onPress: undo
    }
  ]}
>
  {event.description}
</Snackbar>
```

## Layout

Collection of Layout Components.

### Stack

Pile components Horizontally or Vertically.  
Careful! The component will throw if `vertical` and `horizontal` props
have the same value.

Defaults to vertical stack

#### Props

| prop       | type                       | description                      |
| ---------- | -------------------------- | -------------------------------- |
| vertical   | boolean                    | sets the Stack as vertical one   |
| horizontal | boolean                    | sets the Stack as horizontal one |
| style      | Array or Object (optional) | View styles                      |

#### Example

```jsx
<Stack vertical>
  <Card>
    <Card.Content>
      <Text>Card #1</Text>
    </Card.Content>
  </Card>

  <Card>
    <Card.Content>
      <Text>Card #2</Text>
    </Card.Content>
  </Card>
</Stack>
```

```jsx
<Stack horizontal>
  <Badge>Dogs</Badge>
  <Badge>Cats</Badge>
  <Badge>Rats</Badge>
  <Badge>Babies</Badge>
</Stack>
```

## Forms

Collection of components for building forms

### Button

#### Props

| prop         | type                                        | description                                               |
| ------------ | ------------------------------------------- | --------------------------------------------------------- |
| onPress      | Function (optional)                         |                                                           |
| color        | string (optional, defaults to `"blue-600"`) | button color                                              |
| outlined     | boolean (defaults to `false`)               | button with a border, empty filling, colored text         |
| invert       | boolean (defaults to `false`)               | button without background not border, colored text        |
| loading      | boolean (defaults to `false`)               | displays a loader, disables the button                    |
| disabled     | boolean (defaults to `false`)               | disables the button                                       |
| uppercase    | boolean (defaults to `true`)                | text is drawn in uppercase                                |
| children     | string                                      | Button text                                               |
| icon         | React component (optional)                  | Draws an icon aside the text. The loader might replace it |
| iconPosition | `"left"|"right"` (defaults to `"left"`)     | Where to draw the icon (if one is provided)               |
| classes      | object (optional)                           | Styles override, see below                                |

#### Classes

| class     | description                                |
| --------- | ------------------------------------------ |
| container | Button body style                          |
| text      | button text style                          |
| disabled  | Styles to apply when the butto is disabled |

#### Example

```jsx
<Stack horizontal>
  <Button outlined onPress={() => dismiss()}>
    Cancel
  </Button>
  <Button onPress={() => doSomething()}>Primary action</Button>
</Stack>
```

### Checkbox

#### Props

| props         | type                                                    | description                                   |
| ------------- | ------------------------------------------------------- | --------------------------------------------- |
| checked       | boolean                                                 |                                               |
| onCheckChange | function                                                | receives the new value as parameter           |
| label         | string                                                  |                                               |
| error         | error (optional)                                        | error message                                 |
| disabled      | boolean (default to `false`)                            |                                               |
| color         | string (defaults tp `"blue-600"`)                       | check box color, is expected to be a TW color |
| labelPosition | `"left"|"top"|"right"|"bottom"` (defaults to `"right"`) | label position relatively to the box          |

#### Example

```jsx
<Checbox
  checked={checked}
  onCheckChange={setChecked}
  label="I consent to this checkbox, I do"
/>
```

### FlashBox

Displays a contained message, informing the user about the result of a form submission.

You can use the `FlashBox.Error`, `FlashBox.Warning`, `FlashBox.Success`, `FlashBox.Info` as shorthands for various types.

#### Props

| prop     | type                                                                  | description                                  |
| -------- | --------------------------------------------------------------------- | -------------------------------------------- |
| type     | `"error"|"warning"|"success"|"info"` (optional, defaults to `"error"` | Flashbox type, determines the icon and color |
| children | string                                                                | Flashbox content text                        |
| classes  | Object (optional)                                                     | Styles overrides                             |

#### Classes

```ts
interface Classes {
  container?: Array;
  text?: Array;
  error?: {
    background: Array;
    text: Array;
  };
  warning?: {
    background: Array;
    text: Array;
  };
  info?: {
    background: Array;
    text: Array;
  };
  success?: {
    background: Array;
    text: Array;
  };
}
```

#### Example

```jsx
<>
  {error && <FlashBox.Error>error.message} </FlashBox.Error>}
  {result.success && <FlashBox.Success>All went well!<FlashBox.Success>}
</>
```

### IconButton

Button with only an icon in it. Useful for `Card.TopActions`

#### Props

| prop     | type                           | description                                                      |
| -------- | ------------------------------ | ---------------------------------------------------------------- |
| icon     | string (required)              | Icon name (see [Ionicons](https://expo.github.io/vector-icons/)) |
| onPress  | Function (optional)            | Action on click/press                                            |
| disabled | boolean (defaults to `false`)  | Disables the button                                              |
| circled  | boolean (defaults to `true`)   | Shows a round white background and a drop shadow                 |
| size     | number (defaults to `22`)      | Icon size in pixel                                               |
| color    | string (defaults to `"black"`) | Color as rgba or hex string                                      |
| style    | Object or Array (optional)     | Style override                                                   |

#### Example

```jsx
<IconButton icon="md-heart" circled onPress={() => addToFavs()} />
```

### Input

Text Input for use in forms

#### Props

| prop            | type                          | description                                                                             |
| --------------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| value           | string                        |                                                                                         |
| error           | string (defaults to `null`)   | error dispplay below the input                                                          |
| label           | string                        | Input label                                                                             |
| placeholder     | string                        |                                                                                         |
| onValueChange   | (input: string) => void       |                                                                                         |
| onSubmitEditing | () => void                    | Called when user submits the input (e.g. presses enter)                                 |
| autoFocus       | boolean (defaults to `false`) | Focus on mount                                                                          |
| type            | string (defaults to `"none"`) | see [ReactNative Documentation](https://reactnative.dev/docs/textinput#textcontenttype) |
| inputRef        | React.Ref                     | Ref forwarded to interact with the underlying TextInput                                 |
| after           | React.ReactNode               | Component to display after the input                                                    |

#### TODO: Input: Handle numeric entry

#### Example

```jsx
<Input
  autoFocus
  classes={classes}
  label="Nom d'utilisateur"
  placeholder="Nom d'utilisateur"
  value={usernameValue}
  onValueChange={value => {
    // using react-hooks-form
    clearError();
    clearSubmissionError();
    setValue("username", value);
  }}
  onSubmitEditing={onUsernameSubmit}
  error={errors && errors.username && errors.username.message}
/>
```

### Link

Like a button, without background, no uppercase. On web, underlines on hover.  
Mostly intended for navigation.

#### TODO: Would be nice if it behaved like React Router's Link and the `<a>` tag...

#### Props

| prop     | type                          | description                                  |
| -------- | ----------------------------- | -------------------------------------------- |
| onPress  | Function                      | Action on user press/click                   |
| disabled | boolean (defaults to `false`) | Show as disabled, don't react on click/press |
| classes  | Object (optional)             | style overrides                              |

#### Classes

| class    | description                  |
| -------- | ---------------------------- |
| text     | text appearance when enabled |
| disabeld | style to apply when disabled |

#### Example

```jsx
<Link onPress={() => navigation.navigate("home")}>
```

### Radio

Buttons for single choice among a list (radio group).  
To be use in conjunction with the `Radio.Group` component (see example).

#### Radio Props

| prop          | type                                     | description                                            |
| ------------- | ---------------------------------------- | ------------------------------------------------------ |
| value         | string (required)                        | Value associated with the button                       |
| onCheckChange | (value: boolean) => void                 |                                                        |
| disabled      | boolean                                  | `true` disables interactions and alers appearance      |
| label         | string (optional)                        | Radio button label                                     |
| labelPosition | `"left"|"right"` (defaults to `"right"`) | Where to draw the label relatively to the radio button |
| error         | string (optional)                        | Error to display (form validation)                     |
| color         | string (default to `"blue-600"`)         | `tw` color string                                      |

#### Radio.Group Props

| prop          | type                                 | description                                                                                |
| ------------- | ------------------------------------ | ------------------------------------------------------------------------------------------ |
| value         | string                               | radio group currently selected value. One of the children must have it as its `value` prop |
| onValueChange | (value: string) => void              | user picks a new value                                                                     |
| children      | React.ReactNode or React.ReactNode[] | `Radio` components only                                                                    |

#### Example

```jsx
const [favoriteFood, setFavoriteFood] = useState(null);

<Radio.Group value={favoriteFood} onValueChange={setFavoriteFood}>
  <Radio value="risotto" />
  <Radio value="soup" />
  <Radio value="cake" />
</Radio.Group>;
```

## Typography

Set of Text components for a unified typography throughout the app.

All components styles can be overriden or augmented using the `style` prop, as usual

#### Example

```jsx
<Title>This is a title component</Title>

<Subtitle>This is a subtitle component</Subtitle>
<Text>This is a text component </Text><Bold>with a bold</Bold><Text> part in it</Text>

<Caption>Small, grayed out informative piece of text</Caption>
```
