import "./App.css";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const App = () => {
  return (
    <main>
      <h1>TalkZ</h1>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal"/>
          <SignUpButton mode="modal"/>
        </Show>
        <Show when="signed-in">
          <UserButton userProfileMode="modal"/>
        </Show>
      </header>
    </main>
  );
};

export default App;
