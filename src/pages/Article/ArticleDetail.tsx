import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../app/store'
import Button from '../../components/common/Button'
import { ArticelSchema } from '../../schema/article'
import { deleteArticleBySlug, getArticleBySlug } from '../../services/article'
import CreateArticle from './CreateArticle'

function ArticleDetail() {
	const params = useParams()
	const { pathname } = useLocation()

	const navigate = useNavigate()
	const { slug } = params
	const user = useSelector((state: RootState) => state.user)

	const [article, setArticle] = useState<ArticelSchema>()

	async function fetchArticle() {
		if (!slug || slug === 'new') return
		try {
			const res = await getArticleBySlug(slug)
			setArticle(res.article)
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

	return (
		<section className='mx-auto container px-2 sm:px-6 lg:px-8 mt-20 md:mt-32 min-h-[60vh]'>
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
					<div className='md:mt-auto lg:pb-32'>
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
					<div className=''>Comment</div>
				</>
			)}
		</section>
	)
}

export default ArticleDetail
