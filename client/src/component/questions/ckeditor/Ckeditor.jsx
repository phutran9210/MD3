import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = () => {
  const [editorData, setEditorData] = useState("");

  return (
    <div>
      <h2>CKEditor Example</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Initial content of the editor</p>"
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          console.log({ event, editor, data });
        }}
      />
      <div>
        <h3>Editor Data:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorData }} />
      </div>
    </div>
  );
};

export default TextEditor;
