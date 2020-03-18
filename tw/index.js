import { t } from "react-native-tailwindcss";

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback
} from "react";

import {
  useHover,
  useFocus,
  useActive,
  useDimensions
} from "react-native-web-hooks";

import {
  Animated,
  Button as RNButton,
  FlatList as RNFlatList,
  Image as RNImage,
  ImageBackground as RNImageBackground,
  InputAccessoryView as RNInputAccessoryView,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Picker as RNPicker,
  SafeAreaView as RNSafeAreaView,
  SectionList as RNSectionList,
  ScrollView as RNScrollView,
  Switch as RNSwitch,
  Text as RNText,
  TextInput as RNTextInput,
  TouchableHighlight as RNTouchableHighlight,
  TouchableNativeFeedback as RNTouchableNativeFeedback,
  TouchableOpacity as RNTouchableOpacity,
  TouchableWithoutFeedback as RNTouchableWithoutFeedback,
  View as RNView
} from "react-native";

import { color } from "react-native-tailwindcss";
export { color } from "react-native-tailwindcss";

export const Button = wrapComponent(RNButton);
export const FlatList = wrapComponent(RNFlatList, [
  "style",
  "contentContainerStyle"
]);
export const Image = wrapComponent(RNImage);
export const ImageBackground = wrapComponent(RNImageBackground, [
  "style",
  "imageStyle"
]);
export const InputAccessoryView = wrapComponent(RNInputAccessoryView);
export const KeyboardAvoidingView = wrapComponent(RNKeyboardAvoidingView);
export const Picker = wrapComponent(RNPicker);
export const SafeAreaView = wrapComponent(RNSafeAreaView);
export const SectionList = wrapComponent(RNSectionList, [
  "style",
  "contentContainerStyle"
]);
export const ScrollView = wrapComponent(RNScrollView, [
  "style",
  "contentContainerStyle"
]);
export const Switch = wrapComponent(RNSwitch);
export const Text = wrapComponent(RNText);
export const TextInput = wrapComponent(RNTextInput);

export const View = wrapComponent(RNView);

export const AnimatedImage = wrapComponent(Animated.Image);
export const AnimatedScrollView = wrapComponent(Animated.ScrollView);
export const AnimatedText = wrapComponent(Animated.Text);
export const AnimatedView = wrapComponent(Animated.View);
export const AnimatedFlatList = wrapComponent(Animated.FlatList);
export const AnimatedSectionList = wrapComponent(Animated.SectionList);

/**
 * Tailwind class names template strings.
 * Turns a template string into an array of react-native `StyleSheet`
 *
 * @param {Array<string>} stringParts
 * @param {*[]}      externalStyles
 * @return {import('react-native').StyleSheet[]}
 *
 * @example
 * const style = classes`text-red-500`
 * // equals : const style = classes(["text-red-500"])
 *
 * @example
 * const style = classes`text-red-500 flex-1 ${{opacity: animatedValue}}`
 * // equals: const style = classes(["text-red-500 flex-1", ""], {opacity: animatedValue})
 */
export function classes(stringParts, ...externalStyles) {
  /**
   * This is the actual transform function.
   * It is called once with no prefixes (no hover, lg, sm...)
   * It can be called later with a wrapped component
   * @see wrap(Component)
   *
   * @param {string[]} prefixes
   * @return {import('react-native').StyleSheet[]}
   */
  function _applyTemplateString(prefixes = []) {
    const result = [];

    stringParts.forEach((part, idx) => {
      if (part.length > 0) {
        part
          .split(" ")
          .filter(c => c !== "")
          .forEach(className => {
            let classToPush;

            // handle pseudo-classes and breakpoints
            if (className.includes(":")) {
              const p = className.split(":");
              let c = p.pop();

              if (p.every(p => prefixes.includes(p))) {
                classToPush = c;
              }
            }
            // class with no pseudo-class nor breakpoint
            else {
              classToPush = className;
            }

            if (!classToPush) {
              return;
            }

            classToPush = kebabCaseToCamelCase(classToPush).replace("/", "_");

            if (!t[classToPush]) {
              return;
            }

            result.push(t[classToPush]);
          });
      }

      // append inline styles, not-tailwind stylesheets, etc
      if (externalStyles && externalStyles[idx]) {
        let externalStyle = externalStyles[idx];

        if (typeof externalStyle === "string") {
          let c = kebabCaseToCamelCase(externalStyle).replace("/", "_");

          if (t[c]) {
            externalStyle = t[c];
          }
        }

        if (externalStyle.apply) {
          externalStyle = externalStyle.apply(prefixes);
        }

        if (Array.isArray(externalStyle)) {
          externalStyle.forEach(styleSheet => result.push(styleSheet));
        } else {
          result.push(externalStyle);
        }
      }
    });

    return result;
  }

  const styleSheets = _applyTemplateString();

  addPrivateProperties(styleSheets, {
    apply: _applyTemplateString
  });

  return styleSheets;
}

/**
 * Merges two sets of tw classes. Classes with the same name are overwritten
 * by the ones from second parameter.
 *
 * @template I
 * @template J
 * @param {I} base
 * @param {J} otherClasses
 *
 * @return {I & J}
 */
export function mergeClasses(base = {}, otherClasses = {}) {
  return Object.keys(base).reduce((acc, key) => {
    acc[key] = classes`${base[key]} ${otherClasses[key]}`;

    return acc;
  }, {});
}

/**
 * Gets the hex-string representation of a tailwind color.
 *
 * @param {string} color
 * @return {string}
 */
export function getColor(colorString) {
  const colorProp = kebabCaseToCamelCase(colorString);

  return color[colorProp];
}

/**
 * @private
 * Get the Tailwind breakpoint according to the window width
 *
 * @return {"xl"|"lg"|"md"|"sm"}
 */
function useBreakpoints() {
  const {
    window: { width }
  } = useDimensions();

  if (width > 1280) {
    return "xl";
  } else if (width > 1024) {
    return "lg";
  } else if (width > 768) {
    return "md";
  } else if (width > 640) {
    return "sm";
  }

  return;
}

/**
 * Wraps component to allow the use of pseudo-classes and breakpoints
 * such as `lg:hover:bg-black`, `focus:text-red-500`, etc.
 *
 * The second parameter is an optional list of props that can receive
 * an array of `StyleSheet`.
 *
 * @param {Function} Component  The React Compoenent to wrap
 * @param {string[]} [boundProps] Optional list of props to handle
 *
 * @return {Function}
 *
 * @example
 * const TWView = wrapComponent(View)
 * const TWScrollView = wrapComponent(ScrollView, ["style", "contentContainerStyle"])
 */
export function wrapComponent(Component, boundProps = ["style"]) {
  const Wrapped = React.forwardRef(function(
    { onFocus, onBlur, ...props },
    ref
  ) {
    let _ref = ref || React.createRef();

    const isHovered = useHover(_ref);
    const isFocused = useFocus(_ref);
    const isActive = useActive(_ref);
    // Talwind breakpoint "sm"|"md"|"lg"|"xl"|undefined
    const breakpoint = useBreakpoints();

    // Focus needs a specific behaviour to be handled
    // correctly on both Native and web
    let [focus, setFocus] = useState(isFocused);
    useEffect(() => {
      setFocus(isFocused);
    }, [isFocused]);

    const _onFocus = useCallback(
      (...args) => {
        setFocus(true);
        onFocus && onFocus(...args);
      },
      [setFocus]
    );

    const _onBlur = useCallback(
      (...args) => {
        setFocus(false);
        onBlur && onBlur(...args);
      },
      [setFocus]
    );

    // Prefixes for dimensions and pseud-classes
    // these change depending on screen width
    // hover/focus/etc ...
    const prefixes = useMemo(() => {
      let p = breakpoint ? [breakpoint] : [];
      isHovered && p.push("hover");
      focus && p.push("focus");
      isActive && p.push("active");

      return p;
    }, [breakpoint, isHovered, focus, isActive]);

    // Computed style props
    let styleProps = useMemo(() => {
      let result = {};
      boundProps.forEach(boundProp => {
        let style = listWrap(props[boundProp]);

        if (style.apply) {
          style = style.apply(prefixes);
        }

        result[boundProp] = style;
      });

      return result;
    }, [props, boundProps, prefixes]);

    return (
      <Component
        ref={r => {
          if (_ref) {
            _ref.current = r;
          }
        }}
        {...props}
        onFocus={_onFocus}
        onBlur={_onBlur}
        {...styleProps}
      />
    );
  });

  return Wrapped;
}

/**
 * @private
 * Utility function to make sure we have na rray
 */
function listWrap(maybeArray) {
  if (Array.isArray(maybeArray)) {
    return maybeArray;
  } else if (maybeArray) {
    return [maybeArray];
  }

  return [];
}

/**
 * Adds a "private" property to an object
 * Visible, read/writeable but no enumerable
 */
function addPrivateProperties(object, defs) {
  Object.entries(defs).map(([propName, initialValue]) => {
    Object.defineProperty(object, propName, {
      value: initialValue,
      writable: true,
      enumerable: false,
      configurable: false
    });
  });
}

/**
 * Turns kebab case into camel case
 * @example
 * asset(kebabCaseToCamelCase("red-color-string"), "RedColorString")
 */
function kebabCaseToCamelCase(kebabString) {
  const parts = kebabString.split("-");

  return parts.reduce((acc, part, idx) => {
    const Capped =
      idx > 0 ? part.charAt(0).toUpperCase() + part.substring(1) : part;

    return acc + Capped;
  }, "");
}
