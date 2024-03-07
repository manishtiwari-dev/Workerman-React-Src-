import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";



const ContentEditor = (props) => {
  const editor = useRef(null);
  const [content, setContent] = useState(props.initialValue);
  const config = {
    readonly: false,
    height: 500 ,// all options from https://xdsoft.net/jodit/doc/
   // toolbarButtonSize: "small",
    toolbarSticky: true,
    showWordsCounter:true,
    cleanHTML: {
      replaceOldTags: false,
      removeEmptyElements:false,
      fillEmptyParagraph:false
    },

    link: {
      noFollowCheckbox:true,
      openInNewTabCheckbox:true
    },
    image: {
      editSize:false
    },

    allowResizeTags: ['img', 'iframe', 'table', 'jodit'],
    sizeSM:400,
    toolbarAdaptive:true,
    useSearch:true,
    // zIndex: 10000,
    globalFullSize: true,
    // zIndex: 1300 
    
  };

  React.useEffect(() => setContent(props.initialValue), [props.initialValue]);


  

  const handleChange = (value) => {
  //  setContent(value);
    props.updateFun(
      props.setKey,
      value
    );
  };

  



  return (
    <>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        
      //  onChange={newContent => setContent(newContent)}
        onChange={handleChange}
        
      />
    </>

  );
};

export default ContentEditor;
