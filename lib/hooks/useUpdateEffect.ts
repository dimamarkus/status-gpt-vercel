import { useEffect, useRef } from "react";

/**
 * Like useEffect, but doesn't fire on initial render.
 */
export default function useUpdateEffect(effect: Function, dependencyArray: Array<any> = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyArray);
}

/**
 * Bilt-in useEffect executes every time a property in the dependency array changes,
 * but also on the initial render of the component. Sometimes we want to prevent that.
 * For example, to reduce those pesky rerenders that slow down our app. Or maybe you
 * don’t need to fetch API data on each rerender, but only when certain state changes?
 * Here’s a solution for that:
 * We’re basically making use of useRef to keep track of isInitialMount ref and checking
 * it in the useEffect. We can pass any callback function to our custom hook along with
 * a dependency array.
 */

/**
 * Here is a simple use case for that hook—we have a component that displays a value,
 * and when this value changes, it alerts a user. If we were to use regular useEffect
 * there, an alert dialog would pop up every time component is rerendered.
 * Now it’s only when the value changes. Neat!
 *
 *
 *  import { useUpdateEffect } from 'hooks/useUpdateEffect';
 *  export const myComponent = (props) => {
 *   const { value } = props;
 *   useUpdateEffect(() => {
 *     alert(`Value has changed to: ${value}`);
 *   }, [value]);
 *   return ( <span> {value} </span> );
 *  };
 *
 */
