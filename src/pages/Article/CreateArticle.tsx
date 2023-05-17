import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { RootState } from '../../app/store'
import Button from '../../components/common/Button'
import EditorField from '../../components/common/EditorField'
import TextField from '../../components/hook-form/TextField'
import {
	ArticelSchema,
	CreateArticle as CreateArticleSchema
} from '../../schema/article'
import { createArticle, updateArticleBySlug } from '../../services/article'

type CreateArticlePropsType = {
	dataArticle?: ArticelSchema
}

function CreateArticle({ dataArticle }: CreateArticlePropsType) {
	const navigate = useNavigate()
	const user = useSelector((state: RootState) => state.user)
	const location = useLocation()
	const { slug } = useParams()

	const schema = yup.object({
		title: yup.string().required('Title is required.'),
		description: yup.string().required('Description is required.'),
		body: yup.string().required('Body is required.'),
		tagList: yup.array().of(yup.string().required('Tag is required'))
	})

	const methods = useForm<CreateArticleSchema & { tag: string }>({
		defaultValues: {
			title: dataArticle?.title || '',
			description: dataArticle?.description || '',
			body: dataArticle?.body || '',
			tagList: dataArticle?.tagList || [],
			tag: ''
		},
		resolver: yupResolver(schema)
	})

	useEffect(() => {
		methods.reset(dataArticle)
	}, [dataArticle])

	const watchTagList = methods.watch('tagList')

	async function handleSubmit(values: CreateArticleSchema) {
		try {
			if (!dataArticle) {
				await createArticle(values)
			} else {
				if (slug && slug !== 'new') await updateArticleBySlug(slug, values)
			}
			navigate('/articles')
		} catch (error) {
			if (!dataArticle) {
				console.error('Fail to create article: ', error)
			} else {
				console.error('Fail to update article: ', error)
			}
		}
	}

	function handleAddTag() {
		const currentTagList = methods.getValues('tagList')
		const tag = methods.getValues('tag')
		const newTagList = [...currentTagList, tag]

		methods.setValue('tagList', newTagList)
		methods.setValue('tag', '')
	}

	function handleDeleteTag(idx: number) {
		watchTagList.splice(idx, 1)

		methods.setValue('tagList', watchTagList)
	}

	function getDetailEditor(content: string) {
		methods.setValue('body', content)
	}

	if (user.current === null) {
		return <Navigate to='/login' state={{ from: location }} />
	}

	return (
		<div className='pb-32'>
			<h1 className='text-center text-2xl font-medium'>
				{dataArticle ? 'Update articles' : 'Create new articles'}
			</h1>
			<FormProvider {...methods}>
				<form
					className='flex flex-col gap-3 mt-10 max-w-3xl mx-auto'
					onSubmit={methods.handleSubmit(handleSubmit)}
				>
					<div className='flex flex-col sm:flex-row items-center w-full gap-3'>
						<div className='w-full sm:w-auto flex flex-col gap-1.5 flex-1'>
							<label className='text-secondary' htmlFor='title'>
								Title
							</label>
							<TextField name='title' id='title' />
						</div>
						<div className='w-full sm:w-auto flex flex-col gap-1.5 flex-1'>
							<label className='text-secondary' htmlFor='description'>
								Description
							</label>
							<TextField name='description' id='description' />
						</div>
					</div>
					<div className='flex items-center w-full gap-3'>
						<div className='flex flex-col gap-1.5 flex-1'>
							<label className='text-secondary' htmlFor='tag'>
								Tag
							</label>
							<TextField name='tag' id='tag' />
						</div>
						<Button
							onClick={handleAddTag}
							className='self-end text-sm rounded bg-black text-white py-2 px-3 mt-3'
						>
							Add tag
						</Button>
					</div>
					<div className='flex items-center gap-2'>
						{watchTagList.map((tag, idx) => {
							return (
								<div className='relative group' key={idx}>
									<p className='bg-primary text-white px-2 py-1 rounded-md'>
										{tag}
									</p>
									<span
										onClick={() => handleDeleteTag(idx)}
										className='hidden cursor-pointer absolute -top-1 -right-[5px] text-[12px] bg-secondary text-white px-1 group-hover:inline'
									>
										x
									</span>
								</div>
							)
						})}
					</div>

					<div className=''>
						<EditorField
							onEditorStateChange={(value) => getDetailEditor(value)}
							value={methods.getValues('body')}
						/>
					</div>
					<Button
						type='submit'
						className='text-sm rounded bg-black text-white py-2 mt-3 uppercase'
					>
						{dataArticle ? 'Update' : 'Create'}
					</Button>
				</form>
			</FormProvider>
		</div>
	)
}

export default CreateArticle
