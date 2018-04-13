import React from 'react';
import { observable, action } from "mobx";
import { observer } from "mobx-react";


class AppState {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  @action.bound
  reset() {
    this.timer = 0;
  }
}


const appState = new AppState();


// const TimerView = observer(({ appState }) => (
//   <button onClick={appState.reset}>Seconds passed: {appState.timer}</button>
// ));


@observer
class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        <button onClick={appState.reset}>Seconds passed: {appState.timer}</button>
      </div>
    );
  }
}

// const TimerView = observer(({ appState }) => (
//   <button onClick={appState.reset}>Seconds passed: {appState.timer}</button>
// ));


// const HelloWorld = () => (
//   <div>
//     <TimerView appState={new AppState()} />
//     Hello World!! React Test.　俺が来た！！
//   </div>
// );

export default HelloWorld;