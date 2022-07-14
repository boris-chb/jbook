import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './Resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const defaultMaxInnerWidth = innerWidth * 0.75;
  const defaultMinInnerWidth = innerWidth * 0.2;
  const defaultMaxInnerHeight = innerHeight * 0.9;
  const defaultMinInnerHeight = innerHeight * 0.2;

  const [width, setWidth] = useState(defaultMaxInnerWidth);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        // console.log(`cleaning ${timer}`);
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        // console.log('initialising timer');
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        // if window width is smaller than resizable width
        if (window.innerWidth * 0.7 < width) {
          // shrink it down to max
          setWidth(window.innerWidth * 0.7);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  // default props based on direction
  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width,
      resizeHandles: ['e'], // east, i.e. right-hand side
      maxConstraints: [defaultMaxInnerWidth, Infinity], // [horizontal, vertical]
      minConstraints: [defaultMinInnerWidth, Infinity], // [width, height]
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'], // south, i.e. bottom
      maxConstraints: [Infinity, defaultMaxInnerHeight],
      minConstraints: [Infinity, defaultMinInnerHeight],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
