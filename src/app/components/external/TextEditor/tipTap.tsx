// src/Tiptap.jsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu'

// define your extension array
const extensions = [
  StarterKit,
]



async function GetText(editor: any, setValue: any, index: number){
  let text = await editor?.getText()
  setValue(text, index)
}

export default function Tiptap({setValue, defaultValue, index = -1} : {setValue: any; defaultValue?: string; index: number}){

  const content = defaultValue ?? '<p>Enter text here.</p>'

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
    attributes: {
      class: 'prose dark:prose-invert h-52 prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
    },
  }})

  return (
    <>
      <EditorContent onBlur={() => GetText(editor, setValue, index)} className="bg-slate-500/40 h-52 focus-within:bg-slate-500/50 transition-all mt-5 p-1 rounded-lg" editor={editor} />
      {
        editor && 
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className='bg-slate-800/80 text-black p-2 rounded-md flex gap-2'>
            <button 
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`${editor.isActive('bold') ? 'bg-slate-50' : 'bg-slate-50/40 text-white'} h-8 w-8 font-bold p-2 rounded leading-3`}
            >
              A
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`${editor.isActive('italic') ? 'bg-slate-50' : 'bg-slate-50/40 text-white'} h-8 w-8  italic font-medium p-2 rounded leading-3`}
            >
              A
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`${editor.isActive('strike') ? 'bg-slate-50' : 'bg-slate-50/40 text-white'} h-8 w-8 line-through font-medium p-2 rounded leading-3`}
            >
              A
            </button>
          </div>
        </BubbleMenu>
      }
    </>
  )
}