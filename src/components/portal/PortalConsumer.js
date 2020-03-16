import * as React from "react";

export default class PortalConsumer extends React.Component {
  async componentDidMount() {
    this.checkManager();

    // Delay updating to prevent React from going to infinite loop
    await Promise.resolve();

    if (typeof this.props.manager.mount === "function") {
      this.key = this.props.manager.mount(this.props.children);
    }
  }

  componentDidUpdate() {
    this.checkManager();
    console.log(
      "PortalConsumer -> componentDidUpdate ->  this.props.manager.update",
      this.props.manager.update
    );

    if (typeof this.props.manager.update === "function") {
      this.props.manager.update(this.key, this.props.children);
    }
  }

  componentWillUnmount() {
    this.checkManager();

    if (typeof this.props.manager.unmount === "function") {
      this.props.manager.unmount(this.key);
    }
  }

  checkManager() {
    if (!this.props.manager) {
      throw new Error(
        "Looks like you forgot to wrap your root component with `Provider` component from `react-native-paper`.\n\n" +
          "Please read our getting-started guide and make sure you've followed all the required steps.\n\n" +
          "https://callstack.github.io/react-native-paper/getting-started.html"
      );
    }
  }

  render() {
    return null;
  }
}
