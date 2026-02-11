'use client'

import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import MenuBar from './MenuBar'

interface TextEditorProps {
    name: string
    initialValue?: string
}

export default function TextEditor({ name, initialValue }: TextEditorProps) {
    const [value, setValue] = useState(initialValue || '')
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
        ],
        content: initialValue || '',
        editorProps: {
            attributes: {
                class: 'text-editor-content prose prose-sm md:prose-base max-w-none scrollbar-custom',
                placeholder: '...اكتب ردك هنا'
            }
        },
        immediatelyRender: false
    })

    useEffect(() => {
        if (!editor) return
        const handleUpdate = () => {
            const html = editor.getHTML()
            setValue(html)
        }
        editor.on('update', handleUpdate)
        handleUpdate()
        return () => {
            editor.off('update', handleUpdate)
        }
    }, [editor])

    return (
        <div className='text-editor'>
            { editor && <MenuBar editor={ editor } /> }
            <div className='text-editor-body'>
                <EditorContent editor={ editor } />
            </div>
            <input type='hidden' name={ name } value={ value } />
        </div>
    )
}
