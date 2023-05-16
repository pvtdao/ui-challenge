import {
	ContentState,
	convertFromHTML,
	convertToRaw,
	EditorState
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

type EditorFieldPropsType = {
	onEditorStateChange: (value: string) => void
	value: string
}
function EditorField({ onEditorStateChange, value }: EditorFieldPropsType) {
	let [editor, setEditor] = useState(EditorState.createEmpty())

	function handleEditorStateChange(editor: any) {
		setEditor(editor)
		const value = draftToHtml(convertToRaw(editor.getCurrentContent()))
		onEditorStateChange(value)
	}

	useEffect(() => {
		const blockFromHTML = convertFromHTML(value)

		setEditor(
			EditorState.createWithContent(
				ContentState.createFromBlockArray(
					blockFromHTML.contentBlocks,
					blockFromHTML.entityMap
				)
			)
		)
	}, [value])

	return (
		<div
			style={{
				border: '1px solid #dce0e4',
				minHeight: '200px',
				padding: '0 5px'
			}}
		>
			<Editor
				placeholder='Body of article...'
				editorState={editor}
				toolbarClassName='toolbarClassName'
				wrapperClassName='wrapperClassName'
				editorClassName='editorClassName'
				onEditorStateChange={handleEditorStateChange}
				toolbar={{
					options: [
						'inline',
						'blockType',
						'fontSize',
						'fontFamily',
						'list',
						'textAlign',
						'colorPicker',
						'link',
						'embedded',
						'emoji',
						'image',
						'remove',
						'history'
					],
					fontFamily: {
						options: [
							'Arial',
							'Georgia',
							'Impact',
							'Tahoma',
							'Times New Roman',
							'Verdana',
							'Montserrat'
						],
						className: undefined,
						component: undefined,
						dropdownClassName: undefined
					}
				}}
			/>
		</div>
	)
}

export default EditorField
