# Hooks in React / React Native

### 1. **Using `useEffect` for Fetching Data**
You can use `useEffect` to perform side effects, such as fetching data from an API when a component is mounted.

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const FetchDataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty array ensures this runs once when the component mounts.

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>Title: {data.title}</Text>
      <Text>Body: {data.body}</Text>
    </View>
  );
};

export default FetchDataComponent;
```

### 2. **Using `useEffect` with Cleanup**
You can also use `useEffect` to set up subscriptions, timers, or event listeners, and clean them up when the component unmounts.

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup when component unmounts
  }, []);

  return (
    <View>
      <Text>Timer: {seconds} seconds</Text>
    </View>
  );
};

export default TimerComponent;
```

### 3. **Using `useState` for Form Handling**
`useState` is often used for handling form input and managing the state.

```javascript
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const FormComponent = () => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    alert(`Hello, ${name}!`);
  };

  return (
    <View>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={text => setName(text)}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {name ? <Text>Your name is: {name}</Text> : null}
    </View>
  );
};

export default FormComponent;
```

### 4. **Using `useContext` for Global State**
If you want to share state across multiple components, you can use `useContext` and `useReducer` for state management.

```javascript
import React, { useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';

const ThemeContext = React.createContext();

const ChildComponent = () => {
  const theme = useContext(ThemeContext);
  return <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Current theme: {theme}</Text>;
};

const ParentComponent = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <View style={{ padding: 20 }}>
        <ChildComponent />
        <Button
          title="Toggle Theme"
          onPress={() => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))}
        />
      </View>
    </ThemeContext.Provider>
  );
};

export default ParentComponent;
```

### 5. **Using `useLayoutEffect`**
`useLayoutEffect` works similarly to `useEffect`, but it fires synchronously after all DOM mutations. It's useful for measuring the DOM before it's painted.

```javascript
import React, { useLayoutEffect, useRef, useState } from 'react';
import { View, Text, Button } from 'react-native';

const LayoutEffectExample = () => {
  const [width, setWidth] = useState(0);
  const viewRef = useRef(null);

  useLayoutEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height) => {
        setWidth(width);
      });
    }
  });

  return (
    <View ref={viewRef} style={{ padding: 20 }}>
      <Text>Width of this view: {width}</Text>
    </View>
  );
};

export default LayoutEffectExample;
```


### 6. **Using `useMemo` for Expensive Computation**
`useMemo` is useful when you have an expensive computation that you don’t want to recalculate on every render. It memoizes the result and only recalculates if the dependencies change.

```javascript
import React, { useState, useMemo } from 'react';
import { View, Text, Button } from 'react-native';

const ExpensiveComputationComponent = () => {
  const [count, setCount] = useState(0);

  // Simulating an expensive calculation
  const expensiveCalculation = (num) => {
    console.log('Expensive calculation running...');
    return num * 2;
  };

  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Text>Computed Value: {memoizedValue}</Text>
      <Button title="Increase Count" onPress={() => setCount(count + 1)} />
    </View>
  );
};

export default ExpensiveComputationComponent;
```

In this example, the `expensiveCalculation` will only run when the `count` changes, thanks to `useMemo`. This prevents unnecessary recalculations on every render.

### 7. **Using `useCallback` for Memoizing Functions**
`useCallback` is used to memoize a function so that it isn’t recreated on every render, unless its dependencies change. This is particularly useful when passing functions to child components to avoid unnecessary re-renders.

```javascript
import React, { useState, useCallback } from 'react';
import { View, Text, Button } from 'react-native';

const ButtonComponent = React.memo(({ handleClick }) => {
  console.log('ButtonComponent re-rendered');
  return <Button title="Click me" onPress={handleClick} />;
});

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  // Memoize the function, so it is only recreated if `count` changes
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <View>
      <Text>Count: {count}</Text>
      <ButtonComponent handleClick={handleClick} />
      <Button title="Toggle Other State" onPress={() => setOtherState(!otherState)} />
    </View>
  );
};

export default UseCallbackExample;
```

In this example:
- The `handleClick` function is memoized with `useCallback`. It will only be recreated if the `count` value changes.
- `ButtonComponent` is wrapped in `React.memo`, so it only re-renders if its props (`handleClick`) change. Since `useCallback` prevents unnecessary function recreation, `ButtonComponent` will not re-render when `otherState` changes.


### Summary of Hooks in the Examples:
- **`useState`**: For managing state inside a component.
- **`useEffect`**: For performing side effects like data fetching or setting up subscriptions.
- **`useMemo`**: For memoizing the result of expensive calculations.
- **`useCallback`**: For memoizing functions to prevent unnecessary re-creation on every render.
- **`useContext`**: For sharing state across multiple components.
- **`useLayoutEffect`**: Similar to `useEffect`, but fires synchronously after all DOM mutations.

