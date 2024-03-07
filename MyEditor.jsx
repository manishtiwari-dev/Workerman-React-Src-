import React, {  useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ColorPic from "component/ColorPic";

function MyEditor(props) {
  const [editorState, SeteditorState] = useState(EditorState.createEmpty());

  // fontSize.remove(this.state.editorState);
 
  const onEditorStateChange = (editorState) => {
    SeteditorState(editorState);
    props.updateFun(
      props.setKey,
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  console.log(props.setVal);

  // to show already selected value
  React.useEffect(() => {
    if (props.setVal !== "") {
      const html =
        props.setVal === "" ||
        props.setVal === undefined ||
        props.setVal === null
          ? "<p></p>"
          : props.setVal;

      // const html =
      // props.setVal;

      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        SeteditorState(editorState);
      }
    }
  }, [props.setVal]);

  const editorStyle = {
    padding: "5px",
    borderRadius: "2px",
    height: "300px",
    width: "100%",
  };

  return (
    <div className="border1px pd-10">
      <Editor
        editorStyle={editorStyle}
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          fontFamily: {
            options: [
              "Arial",
              "Georgia",
              "Impact",
              "Tahoma",
              "Times New Roman",
              "Verdana",
            ],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          link: { inDropdown: true },
          history: { inDropdown: true },
          colorPicker: { component: ColorPic },
        }}
      />
    </div>
  );
}

export default MyEditor;
