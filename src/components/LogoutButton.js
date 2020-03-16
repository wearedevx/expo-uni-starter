import React from "react";

import { useUser } from "src/stores/user";

import Button from "components/form/Button";

LogoutButton.defaultProps = {
  outlined: false,
  color: "blue-600"
};

export default function LogoutButton({ outlined, color }) {
  const resetApp = useUser(({ resetApp }) => resetApp);

  return (
    <Button outlined={outlined} color={color} onPress={() => resetApp()}>
      Se déconnecter
    </Button>
  );
}
