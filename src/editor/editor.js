import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'

let editor;

async function getScriptCode() {
    const scriptTag = document.getElementById('custom-sketch')
    const src = scriptTag.getAttribute('src');
    if (src) {
        try{
            const response = await fetch(src);
            const result = await response.text();
            // strip the #sourcemappingurl comment
            return result.replace(/\/\/# sourceMappingURL=.*/g, '');
        }catch (error){
            console.error(error);
            return '';
        }
    }
    return scriptTag.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    editor = ace.edit(document.getElementById('editor'))
    // format the code at the beginning

    editor.session.setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/monokai');
    editor.session.setTabSize(2);
    editor.session.setUseSoftTabs(true);
    editor.session.setUseWrapMode(true);

    getScriptCode().then((code) => {
        editor.setValue(code, -1);
    });



    function runCode() {
        const sketchCode = editor.getValue();
        try {
            const previewFrame = document.getElementById('sketch-preview');
            previewFrame.src = 'about:blank';
            previewFrame.srcdoc = `
            <html lang="en">
                <head>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.2/p5.min.js"></script>
                    <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js" type="text/javascript"></script>
                </head>
                <body>
                    <script>${sketchCode}</script>
                </body>
            </html>`;
        } catch (error) {
            console.error(error);
        }
    }

    // run code when user presses cmd/ctrl + enter
    editor.commands.addCommand({
        name: 'runCode',
        bindKey: {win: 'Ctrl-Enter', mac: 'Cmd-Enter'},
        exec: () => runCode()
    });

    editor.commands.addCommand({
        name: 'saveFileToElectron',
        bindKey: {win: 'Ctrl-s', mac: 'Cmd-s'},
        exec: () => {
            const sketchCode = editor.getValue();
            const file = new Blob([sketchCode], {type: 'text/javascript'});
            // use html5 File api to save on disk

        }
    });

    // editor.on('change', () => runCode());
    runCode();
});
