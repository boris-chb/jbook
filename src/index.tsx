import * as esbuild from 'esbuild-wasm';
import { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/CodeEditor';

const App = () => {
  const [input, setInput] = useState('');
  const ref = useRef<any>();
  const iframe = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async (e: any) => {
    e.preventDefault();

    if (!ref.current) {
      return;
    }

    // resetting the iframe
    iframe.current.srcdoc = html;

    // Bundling
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

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

  return (
    <div>
      <CodeEditor
        initialValue={"'initial value from index.tsx'"}
        onChange={value => {
          setInput(value);
        }}
      />
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Run</button>
      </div>
      <iframe
        sandbox='allow-scripts'
        srcDoc={html}
        ref={iframe}
        title='output'
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
