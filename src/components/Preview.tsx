import { useEffect, useRef } from 'react';

import './Preview.css';

interface PreviewProps {
  code: string;
}

const html = `
<html>
<head> </head>
<body>
  <div id="root"></div>
  <script>
    window.addEventListener(
      'message',
      e => {
        try {
          eval(e.data);
        } catch (err) {
          const root = document.getElementById('root');
          root.innerHTML = \`<div style="color: red"><h4>Runtime Error</h4>\${err}</div>\`
          console.error(err);
        }
      },
      false
    );
  </script>
</body>
</html>

`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // resetting the iframe every time code changes
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        sandbox='allow-scripts'
        srcDoc={html}
        ref={iframe}
        title='output'
      />
    </div>
  );
};
export default Preview;
