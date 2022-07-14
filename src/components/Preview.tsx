import { useEffect, useRef } from 'react';

import './Preview.css';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
<head><style>html { background-color: whitesmoke; }</style></head>
<body>
  <div id="root"></div>
  <script>
    const handleError = (err) => {
      const root = document.getElementById('root');
      root.innerHTML = \`<div style="color: red"><h4>Runtime Error</h4>\${err}</div>\`
      console.error(err);
    }

    window.addEventListener('error', (e) => {
      e.preventDefault();
      handleError(e.error);
    });

    window.addEventListener(
      'message',
      e => {
        try {
          eval(e.data);
        } catch (err) {
          handleError(err)
        }
      },
      false
    );
  </script>
</body>
</html>

`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // resetting the iframe every time code changes
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 100);
  }, [code]);

  console.log(err);

  return (
    <div className='preview-wrapper'>
      <iframe
        sandbox='allow-scripts'
        srcDoc={html}
        ref={iframe}
        title='output'
      />
      {err && <div className='preview-error'>{err}</div>}
    </div>
  );
};
export default Preview;
