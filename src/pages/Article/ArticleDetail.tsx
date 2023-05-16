import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { RootState } from '../../app/store'
import Button from '../../components/common/Button'
import TextField from '../../components/hook-form/TextField'
import { ArticelSchema, CommentSchema } from '../../schema/article'
import {
	createComment,
	deleteArticleBySlug,
	deleteCommentById,
	getArticleBySlug,
	updateCommentById
} from '../../services/article'
import CommentCard from './CommentCard'
import CreateArticle from './CreateArticle'

function ArticleDetail() {
	const params = useParams()
	const { pathname } = useLocation()

	const navigate = useNavigate()
	const { slug } = params
	const user = useSelector((state: RootState) => state.user)

	const [article, setArticle] = useState<ArticelSchema>()
	const [comments, setComments] = useState<CommentSchema[]>([])
	const schema = yup.object({
		body: yup.string().required('Comment is required.')
	})

	const methods = useForm<{ body: string }>({
		defaultValues: {
			body: ''
		},
		resolver: yupResolver(schema)
	})

	async function fetchArticle() {
		if (!slug || slug === 'new') return
		try {
			const res = await getArticleBySlug(slug)
			setArticle(res.article)
			setComments(res.article.comments)
		} catch (error) {
			console.error('Failed to get detail article: ', error)
		}
	}

	async function handleDeleteArticle() {
		if (!slug) return
		try {
			await deleteArticleBySlug(slug)
			navigate('/articles')
		} catch (error) {
			console.error('Fail to delete article: ', error)
		}
	}

	useEffect(() => {
		fetchArticle()
	}, [slug])

	async function handleAddComment(values: { body: string }) {
		if (!slug || slug === 'new') return
		try {
			const rs = await createComment(slug, values)
			setComments(rs.article.comments)
			methods.reset({ body: '' })
		} catch (error) {
			console.error('Failed to create comment: ', error)
		}
	}

	async function handleDeleteComment(id: number) {
		if (!slug || slug === 'new') return

		try {
			const rs = await deleteCommentById(slug, id)
			setComments(rs.article.comments)
		} catch (error) {
			console.error('Failed to delete comment: ', error)
		}
	}

	async function handleUpdateComment(id: number, payload: { body: string }) {
		if (!slug || slug === 'new') return

		try {
			const rs = await updateCommentById(slug, id, payload)
			setComments(rs.article.comments)
		} catch (error) {
			console.error('Failed to delete comment: ', error)
		}
	}

	return (
		<section className='mx-auto container px-2 sm:px-6 lg:px-8 mt-20 md:mt-32 min-h-[60vh] pb-32'>
			{slug === 'new' || pathname.includes('/update') ? (
				<CreateArticle dataArticle={article} />
			) : (
				<>
					{user.current !== null && (
						<div className='flex gap-2 justify-end mb-10'>
							<Button
								onClick={() => navigate(`update`)}
								className='text-sm rounded bg-black text-white py-2 mt-3 px-4'
							>
								Sửa
							</Button>
							<Button
								onClick={handleDeleteArticle}
								className='text-sm rounded bg-error text-white py-2 mt-3 px-4'
							>
								Xóa
							</Button>
						</div>
					)}
					<div className='md:mt-auto lg:pb-10'>
						<h1 className='text-left md:text-center font-bold text-xl'>
							{article?.title}
						</h1>
						<p className='text-left md:text-center mt-2'>
							{article?.description}
						</p>

						{article && (
							<div
								className='mt-10 detail-article'
								dangerouslySetInnerHTML={{ __html: article!.body }}
							></div>
						)}
						<div className='flex items-center gap-2 mt-10'>
							{article?.tagList.map((tag, idx) => {
								return (
									<div className='relative group' key={idx}>
										<p className='bg-primary text-white px-2 py-1 rounded-md'>
											{tag}
										</p>
									</div>
								)
							})}
						</div>
					</div>
					<div className='mt-10'>
						<h1 className='text-left text-xl font-medium'>Comments</h1>
						{!comments || comments.length === 0 ? (
							<p className='mt-1 '>Chưa có bình luận</p>
						) : (
							<div className='mt-5'>
								{comments.map((cm) => {
									return (
										<CommentCard
											key={cm.id}
											comments={cm}
											handleDeleteComment={(id: number) =>
												handleDeleteComment(id)
											}
											handleUpdateComment={(
												id: number,
												payload: { body: string }
											) => handleUpdateComment(id, payload)}
										/>
									)
								})}
							</div>
						)}

						{user.current !== null && (
							<FormProvider {...methods}>
								<form
									className='mt-10'
									onSubmit={methods.handleSubmit(handleAddComment)}
								>
									<div className='flex flex-col gap-1.5 w-full md:max-w-2xl'>
										<label className='text-secondary' htmlFor='body'>
											Add comment
										</label>
										<TextField name='body' id='body' />
									</div>
									<Button
										type='submit'
										className='text-sm rounded bg-black text-white py-2 px-3 mt-3'
									>
										Comment
									</Button>
								</form>
							</FormProvider>
						)}
					</div>
				</>
			)}
		</section>
	)
}

export default ArticleDetail
